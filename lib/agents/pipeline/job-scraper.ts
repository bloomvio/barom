// Job Posting Pipeline — JobSpy wrapper
// Requires: PROXY_URL env var (Bright Data or ScraperAPI residential proxy)
// See PROXY_SETUP_GUIDE.md for setup instructions

// Search queries covering all 18 role types × key geographies
const SEARCH_QUERIES = [
  // QA
  { term: "QA manual testing consulting", country: "in" },
  { term: "test automation engineer Selenium consulting", country: "in" },
  { term: "SDET test architect consulting", country: "in" },
  { term: "QA manual testing consulting", country: "us" },
  // App Dev
  { term: "Java developer TCS Infosys Wipro", country: "in" },
  { term: "Python developer consulting", country: "in" },
  { term: "React developer consulting", country: "in" },
  { term: "Java developer IT services", country: "us" },
  // ERP
  { term: "SAP consultant India", country: "in" },
  { term: "SAP functional consultant", country: "us" },
  { term: "Oracle ERP consultant", country: "in" },
  { term: "Workday consultant", country: "us" },
  // Salesforce / ServiceNow
  { term: "Salesforce developer consulting", country: "in" },
  { term: "ServiceNow developer consulting", country: "in" },
  // DevOps / Cloud
  { term: "DevOps engineer consulting", country: "in" },
  { term: "cloud architect consulting Big 4", country: "us" },
  { term: "SRE site reliability engineer consulting", country: "us" },
  // Data
  { term: "data engineer consulting", country: "in" },
  { term: "BI developer analytics consulting", country: "in" },
  // Business Analyst
  { term: "business analyst IT consulting", country: "in" },
  { term: "business analyst consulting", country: "us" },
  // Support / Ops
  { term: "L2 support IT operations consulting", country: "in" },
];

export interface ScrapeResult {
  postingsStored: number;
  newPostings: number;
  duplicatesSkipped: number;
  queriesRun: number;
  errors: string[];
}

export async function scrapeJobs(): Promise<ScrapeResult> {
  // NOTE: This function requires the following packages to be installed:
  // pip install jobspy (Python) OR use the JobSpy HTTP API wrapper
  // For the Node.js implementation, we call a local Python script or API

  const { prisma } = await import("@/lib/prisma");

  let postingsStored = 0;
  let duplicatesSkipped = 0;
  const errors: string[] = [];

  for (const query of SEARCH_QUERIES) {
    try {
      // Call JobSpy via a local Python subprocess or Railway sidecar
      // TODO: Replace with actual JobSpy call when proxy is configured
      // const postings = await callJobSpy(query.term, query.country);
      const postings: Array<{
        title: string; company: string; location: string;
        description: string; salary_min?: number; salary_max?: number;
        date_posted?: string; skills?: string[];
      }> = [];

      for (const posting of postings) {
        // Create a dedup hash
        const crypto = await import("crypto");
        const dedupeHash = crypto
          .createHash("sha256")
          .update(`${posting.title}|${posting.company}|${posting.location}`)
          .digest("hex");

        try {
          await prisma.postingSnapshot.create({
            data: {
              source: "jobspy",
              title: posting.title,
              company: posting.company,
              location: posting.location,
              country: query.country === "in" ? "india" : "us",
              description: posting.description,
              salaryMin: posting.salary_min,
              salaryMax: posting.salary_max,
              salaryCurrency: query.country === "in" ? "INR" : "USD",
              datePosted: posting.date_posted ? new Date(posting.date_posted) : null,
              skills: posting.skills ?? [],
              searchQuery: query.term,
              dedupeHash,
            },
          });
          postingsStored++;
        } catch {
          duplicatesSkipped++;
        }
      }
    } catch (err) {
      errors.push(`Query "${query.term}" failed: ${err}`);
    }
  }

  return {
    postingsStored,
    newPostings: postingsStored,
    duplicatesSkipped,
    queriesRun: SEARCH_QUERIES.length,
    errors,
  };
}
