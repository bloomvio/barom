// Earnings & Filings Pipeline
// SEC EDGAR (US firms) — free API, no auth required
// BSE India — TODO (requires scraping)
// Requires: ANTHROPIC_API_KEY for parsing via Claude Haiku

import Anthropic from "@anthropic-ai/sdk";

const EDGAR_API  = "https://data.sec.gov";
const EDGAR_ARCH = "https://www.sec.gov/Archives/edgar";
// SEC requires a descriptive User-Agent identifying your app and contact
const EDGAR_HEADERS = {
  "User-Agent": "Barom.ai contact@barom.ai",
  "Accept-Encoding": "gzip, deflate",
};

const TRACKED_FIRMS = [
  // US-listed IT services / consulting (SEC EDGAR)
  { name: "Accenture",     ticker: "ACN",  cik: "0001467373", exchange: "NYSE",   country: "us" },
  { name: "Cognizant",     ticker: "CTSH", cik: "0001058290", exchange: "NASDAQ", country: "us" },
  { name: "EPAM Systems",  ticker: "EPAM", cik: "0001352010", exchange: "NYSE",   country: "us" },
  { name: "Infosys ADR",   ticker: "INFY", cik: "0001067491", exchange: "NYSE",   country: "us" },
  { name: "Wipro ADR",     ticker: "WIT",  cik: "0001120774", exchange: "NYSE",   country: "us" },
  { name: "HCL Tech ADR",  ticker: "HCLT", cik: "0001274494", exchange: "NYSE",   country: "us" },
  { name: "DXC Technology",ticker: "DXC",  cik: "0001688568", exchange: "NYSE",   country: "us" },
  { name: "Unisys",        ticker: "UIS",  cik: "0000101830", exchange: "NYSE",   country: "us" },
  // India-listed IT services (BSE) — stubs; parsed when BSE integration is added
  { name: "TCS",           ticker: "TCS",  bseCode: "532540", exchange: "BSE",    country: "in" },
  { name: "Infosys",       ticker: "INFY", bseCode: "500209", exchange: "BSE",    country: "in" },
  { name: "Wipro",         ticker: "WIPRO",bseCode: "507685", exchange: "BSE",    country: "in" },
  { name: "HCL Tech",      ticker: "HCLTECH",bseCode:"532281",exchange: "BSE",    country: "in" },
  { name: "Tech Mahindra", ticker: "TECHM",bseCode: "532755", exchange: "BSE",    country: "in" },
  { name: "LTIMindtree",   ticker: "LTIM", bseCode: "540005", exchange: "BSE",    country: "in" },
  { name: "Mphasis",       ticker: "MPHASIS",bseCode:"526299",exchange: "BSE",    country: "in" },
  { name: "Persistent Systems",ticker:"PERSISTENT",bseCode:"533179",exchange:"BSE",country:"in"},
] as const;

interface FilingRef {
  accessionNumber: string;
  form: string;
  filingDate: string;
  primaryDocument: string;
}

interface ParsedSignals {
  headcountReported: number | null;
  headcountDelta: number | null;
  aiMentionsCount: number;
  restructuringChargeUsd: number | null;
  workforceSentiment: "expanding" | "stable" | "contracting";
  keySignals: string[];
  rawExcerpt: string;
}

export interface FilingResult {
  filingsProcessed: number;
  newInsights: number;
  firms: string[];
  errors: string[];
}

// ── EDGAR helpers ─────────────────────────────────────────────────────────────

function padCik(cik: string): string {
  return cik.replace(/^0+/, "").padStart(10, "0");
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchEdgarJson(url: string): Promise<unknown> {
  await sleep(110); // respect EDGAR 10 req/s limit
  const res = await fetch(url, { headers: EDGAR_HEADERS });
  if (!res.ok) throw new Error(`EDGAR ${url} → ${res.status}`);
  return res.json();
}

async function fetchEdgarText(url: string): Promise<string> {
  await sleep(110);
  const res = await fetch(url, { headers: EDGAR_HEADERS });
  if (!res.ok) throw new Error(`EDGAR text ${url} → ${res.status}`);
  return res.text();
}

async function getRecentFilings(cik: string): Promise<FilingRef[]> {
  const padded = padCik(cik);
  const data = await fetchEdgarJson(`${EDGAR_API}/submissions/CIK${padded}.json`) as {
    filings: {
      recent: {
        accessionNumber: string[];
        form: string[];
        filingDate: string[];
        primaryDocument: string[];
      };
    };
  };

  const { accessionNumber, form, filingDate, primaryDocument } = data.filings.recent;
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 9); // last 9 months → ~3 quarters

  const refs: FilingRef[] = [];
  for (let i = 0; i < form.length; i++) {
    if (!["8-K", "10-Q", "10-K"].includes(form[i])) continue;
    if (new Date(filingDate[i]) < cutoff) break; // array is sorted newest-first
    refs.push({
      accessionNumber: accessionNumber[i],
      form: form[i],
      filingDate: filingDate[i],
      primaryDocument: primaryDocument[i],
    });
    if (refs.length >= 5) break; // cap at 5 filings per firm per run
  }
  return refs;
}

async function fetchFilingExcerpt(cik: string, filing: FilingRef): Promise<string> {
  const cleanCik = cik.replace(/^0+/, "");
  const cleanAccession = filing.accessionNumber.replace(/-/g, "");

  // Try primary document first
  const docUrl = `${EDGAR_ARCH}/data/${cleanCik}/${cleanAccession}/${filing.primaryDocument}`;
  const raw = await fetchEdgarText(docUrl);

  // Strip HTML tags and collapse whitespace
  const text = raw
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

  // Return first 12K chars — enough to cover executive summary and key disclosures
  return text.slice(0, 12000);
}

// ── Claude Haiku parsing ──────────────────────────────────────────────────────

function countAiMentions(text: string): number {
  const patterns = [
    /\bartificial intelligence\b/gi,
    /\bgenerative ai\b/gi,
    /\bgen ai\b/gi,
    /\blarge language model\b/gi,
    /\bllm\b/g,
    /\bcopilot\b/gi,
    /\bgpt\b/gi,
    /\bchatgpt\b/gi,
    /\bai-driven\b/gi,
    /\bai-powered\b/gi,
    /\bml model\b/gi,
    /\bmachine learning\b/gi,
  ];
  return patterns.reduce((n, p) => n + (text.match(p)?.length ?? 0), 0);
}

async function parseWithClaude(
  firmName: string,
  form: string,
  filingDate: string,
  excerpt: string,
  apiKey: string
): Promise<ParsedSignals> {
  const client = new Anthropic({ apiKey });

  const aiMentionsCount = countAiMentions(excerpt);

  const prompt = `You are parsing an SEC ${form} filing for ${firmName} dated ${filingDate}.

Extract ONLY what is explicitly stated. Return valid JSON matching this schema:
{
  "headcountReported": number | null,       // total employees if stated
  "headcountDelta": number | null,           // net change (negative = cuts)
  "restructuringChargeUsd": number | null,   // in whole USD (not millions)
  "workforceSentiment": "expanding" | "stable" | "contracting",
  "keySignals": string[]                     // 2-4 verbatim short quotes about workforce/AI
}

Rules:
- If a value is not stated, use null
- headcountDelta: if they say "reduced by 10,000" use -10000
- restructuringChargeUsd: convert millions to whole USD (e.g. "$350 million" = 350000000)
- workforceSentiment: base on headcount trend, hiring freeze, or expansion language
- keySignals: pick the most specific quotes about workforce size, AI investment, or restructuring

Filing excerpt:
${excerpt.slice(0, 6000)}`;

  const msg = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    messages: [{ role: "user", content: prompt }],
  });

  const content = msg.content[0].type === "text" ? msg.content[0].text : "{}";

  // Extract JSON from response (Haiku sometimes adds preamble)
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON in Claude response");

  const parsed = JSON.parse(jsonMatch[0]);

  return {
    headcountReported: parsed.headcountReported ?? null,
    headcountDelta: parsed.headcountDelta ?? null,
    aiMentionsCount,
    restructuringChargeUsd: parsed.restructuringChargeUsd ?? null,
    workforceSentiment: parsed.workforceSentiment ?? "stable",
    keySignals: parsed.keySignals ?? [],
    rawExcerpt: excerpt.slice(0, 2000),
  };
}

// ── Main pipeline ─────────────────────────────────────────────────────────────

export async function checkFilings(): Promise<FilingResult> {
  const { prisma } = await import("@/lib/prisma");
  const apiKey = process.env.ANTHROPIC_API_KEY!;

  let filingsProcessed = 0;
  let newInsights = 0;
  const firmsChecked: string[] = [];
  const errors: string[] = [];

  // Ensure all tracked firms exist in DB
  for (const firm of TRACKED_FIRMS) {
    const id = "cik" in firm ? firm.cik : (firm as { bseCode: string }).bseCode;
    await prisma.trackedFirm.upsert({
      where: { id },
      update: { lastCheckedAt: new Date() },
      create: {
        id,
        name: firm.name,
        ticker: firm.ticker,
        cik: "cik" in firm ? firm.cik : undefined,
        bseCode: "bseCode" in firm ? (firm as { bseCode: string }).bseCode : undefined,
        exchange: firm.exchange,
        firmType: getFirmType(firm.name),
        headquarterCountry: firm.country === "in" ? "India" : "USA",
        lastCheckedAt: new Date(),
      },
    }).catch(() => {}); // ignore if already exists with different id
  }

  for (const firm of TRACKED_FIRMS) {
    // BSE India: not yet implemented
    if (firm.exchange === "BSE") {
      firmsChecked.push(`${firm.name} (BSE — pending)`);
      continue;
    }

    const firmCik = (firm as { cik: string }).cik;

    try {
      const filings = await getRecentFilings(firmCik);

      // Get or create TrackedFirm db record
      const dbFirm = await prisma.trackedFirm.findFirst({
        where: { cik: firmCik },
      });
      if (!dbFirm) {
        errors.push(`${firm.name}: no DB record found`);
        continue;
      }

      for (const filing of filings) {
        // Skip if already stored
        const existing = await prisma.filingInsight.findFirst({
          where: {
            firmId: dbFirm.id,
            filingDate: new Date(filing.filingDate),
            filingType: filing.form,
          },
        });
        if (existing) continue;

        try {
          const excerpt = await fetchFilingExcerpt(firmCik, filing);
          const signals = await parseWithClaude(
            firm.name,
            filing.form,
            filing.filingDate,
            excerpt,
            apiKey
          );

          await prisma.filingInsight.create({
            data: {
              firmId: dbFirm.id,
              filingType: filing.form,
              filingDate: new Date(filing.filingDate),
              source: "sec-edgar",
              sourceUrl: `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${firmCik}&type=${filing.form}`,
              headcountReported: signals.headcountReported,
              headcountDelta: signals.headcountDelta,
              aiMentionsCount: signals.aiMentionsCount,
              restructuringChargeUsd: signals.restructuringChargeUsd
                ? BigInt(Math.round(signals.restructuringChargeUsd))
                : null,
              workforceSentiment: signals.workforceSentiment,
              keySignals: signals.keySignals,
              rawExcerpt: signals.rawExcerpt,
            },
          });

          newInsights++;
          filingsProcessed++;
        } catch (filingErr) {
          errors.push(`${firm.name} ${filing.form} ${filing.filingDate}: ${filingErr}`);
        }
      }

      firmsChecked.push(firm.name);
    } catch (err) {
      errors.push(`${firm.name}: ${err}`);
    }
  }

  return { filingsProcessed, newInsights, firms: firmsChecked, errors };
}

function getFirmType(name: string): string {
  const tier1 = ["TCS", "Infosys", "Wipro", "HCL", "Tech Mahindra", "Cognizant", "LTI", "Mphasis", "Persistent"];
  if (tier1.some((t) => name.includes(t))) return "tier1-si";
  if (["Accenture", "Deloitte", "PwC", "EY", "KPMG"].some((t) => name.includes(t))) return "big4-tech";
  return "tier2-si";
}
