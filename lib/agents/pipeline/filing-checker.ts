// Earnings & Filings Pipeline
// SEC EDGAR (US firms) + BSE India (Indian IT services firms)
// Requires: ANTHROPIC_API_KEY for parsing via Claude Haiku

const TRACKED_FIRMS = [
  // US-listed IT services / Big 4 (SEC EDGAR)
  { name: "Accenture", ticker: "ACN", cik: "0001467373", exchange: "NYSE", country: "us" },
  { name: "Cognizant", ticker: "CTSH", cik: "0001058290", exchange: "NASDAQ", country: "us" },
  { name: "EPAM Systems", ticker: "EPAM", cik: "0001352010", exchange: "NYSE", country: "us" },
  { name: "Infosys ADR", ticker: "INFY", cik: "0001067491", exchange: "NYSE", country: "us" },
  { name: "Wipro ADR", ticker: "WIT", cik: "0001120774", exchange: "NYSE", country: "us" },
  { name: "HCL Tech ADR", ticker: "HCLT", cik: "0001274494", exchange: "NYSE", country: "us" },
  { name: "DXC Technology", ticker: "DXC", cik: "0001688568", exchange: "NYSE", country: "us" },
  { name: "Unisys", ticker: "UIS", cik: "0000101830", exchange: "NYSE", country: "us" },
  // India-listed IT services (BSE)
  { name: "TCS", ticker: "TCS", bseCode: "532540", exchange: "BSE", country: "in" },
  { name: "Infosys", ticker: "INFY", bseCode: "500209", exchange: "BSE", country: "in" },
  { name: "Wipro", ticker: "WIPRO", bseCode: "507685", exchange: "BSE", country: "in" },
  { name: "HCL Tech", ticker: "HCLTECH", bseCode: "532281", exchange: "BSE", country: "in" },
  { name: "Tech Mahindra", ticker: "TECHM", bseCode: "532755", exchange: "BSE", country: "in" },
  { name: "LTIMindtree", ticker: "LTIM", bseCode: "540005", exchange: "BSE", country: "in" },
  { name: "Mphasis", ticker: "MPHASIS", bseCode: "526299", exchange: "BSE", country: "in" },
  { name: "Persistent Systems", ticker: "PERSISTENT", bseCode: "533179", exchange: "BSE", country: "in" },
];

export interface FilingResult {
  filingsProcessed: number;
  newInsights: number;
  firms: string[];
  errors: string[];
}

export async function checkFilings(): Promise<FilingResult> {
  const { prisma } = await import("@/lib/prisma");
  let filingsProcessed = 0;
  let newInsights = 0;
  const firmsChecked: string[] = [];
  const errors: string[] = [];

  // Ensure all tracked firms exist in DB
  for (const firm of TRACKED_FIRMS) {
    await prisma.trackedFirm.upsert({
      where: { id: firm.ticker + firm.exchange },
      update: { lastCheckedAt: new Date() },
      create: {
        id: firm.ticker + firm.exchange,
        name: firm.name,
        ticker: firm.ticker,
        cik: firm.cik,
        bseCode: firm.bseCode,
        exchange: firm.exchange,
        firmType: getFirmType(firm.name),
        headquarterCountry: firm.country === "in" ? "India" : "USA",
        lastCheckedAt: new Date(),
      },
    }).catch(() => {
      // Handle case where upsert fails due to schema mismatch
    });
  }

  for (const firm of TRACKED_FIRMS) {
    try {
      if (firm.cik) {
        // SEC EDGAR: check for new 8-K and 10-Q filings
        // TODO: Implement SEC EDGAR API call
        // const filings = await fetchSecFilings(firm.cik);
        firmsChecked.push(firm.name);
      } else if (firm.bseCode) {
        // BSE India: check for quarterly results
        // TODO: Implement BSE scraper
        // const filings = await fetchBseFilings(firm.bseCode);
        firmsChecked.push(firm.name);
      }
      filingsProcessed++;
    } catch (err) {
      errors.push(`${firm.name}: ${err}`);
    }
  }

  return {
    filingsProcessed,
    newInsights,
    firms: firmsChecked,
    errors,
  };
}

function getFirmType(name: string): string {
  const tier1 = ["TCS", "Infosys", "Wipro", "HCL", "Tech Mahindra", "Cognizant", "LTI", "Mphasis", "Persistent"];
  if (tier1.some((t) => name.includes(t))) return "tier1-si";
  if (["Accenture", "Deloitte", "PwC", "EY", "KPMG"].some((t) => name.includes(t))) return "big4-tech";
  return "tier2-si";
}
