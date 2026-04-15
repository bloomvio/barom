import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { IntakeAnswers } from "@/lib/types";

export default async function AdminReadings({
  searchParams,
}: {
  searchParams: { auth?: string; page?: string; band?: string };
}) {
  const adminPw = process.env.ADMIN_PASSWORD ?? "";
  if (searchParams.auth !== adminPw) {
    return <div className="p-8 text-red-400 font-mono">Unauthorized</div>;
  }

  const page = parseInt(searchParams.page ?? "1");
  const limit = 50;
  const skip = (page - 1) * limit;
  const bandFilter = searchParams.band;

  const where = bandFilter ? { band: bandFilter } : {};

  const [readings, total] = await Promise.all([
    prisma.reading.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
      include: { user: { select: { email: true, subscriptionTier: true } } },
    }),
    prisma.reading.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-bg text-text">
      <nav className="border-b border-border px-6 py-4 flex items-center gap-6">
        <Link href={`/admin?auth=${adminPw}`} className="font-mono text-xs text-text-muted hover:text-amber-DEFAULT">
          ← Dashboard
        </Link>
        <span className="font-mono text-xs text-text-dim uppercase tracking-widest">
          Readings ({total})
        </span>
      </nav>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-3 mb-6 flex-wrap">
          {["", "low", "moderate", "elevated", "high"].map((band) => (
            <Link
              key={band || "all"}
              href={`/admin/readings?auth=${adminPw}${band ? `&band=${band}` : ""}`}
              className={`font-mono text-xs px-3 py-1.5 border ${
                bandFilter === band || (!bandFilter && !band)
                  ? "border-amber-DEFAULT text-amber-DEFAULT"
                  : "border-border text-text-muted"
              }`}
            >
              {band || "All"}
            </Link>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full font-mono text-xs border border-border">
            <thead>
              <tr className="border-b border-border bg-surface">
                {["ID", "Score", "Band", "Role", "Geography", "Email", "Date"].map((h) => (
                  <th key={h} className="text-left p-3 text-text-dim uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {readings.map((r) => {
                const intake = r.intake as Partial<IntakeAnswers>;
                return (
                  <tr key={r.id} className="border-b border-border hover:bg-surface">
                    <td className="p-3 text-text-faint">{r.publicId}</td>
                    <td className="p-3 text-amber-DEFAULT">{r.score}</td>
                    <td className="p-3 capitalize">{r.band}</td>
                    <td className="p-3 text-text-muted">{intake.roleType ?? "—"}</td>
                    <td className="p-3 text-text-muted">{intake.geography ?? "—"}</td>
                    <td className="p-3 text-text-muted">{r.user?.email ?? "anon"}</td>
                    <td className="p-3 text-text-faint">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex gap-3 mt-6">
          {page > 1 && (
            <Link
              href={`/admin/readings?auth=${adminPw}&page=${page - 1}${bandFilter ? `&band=${bandFilter}` : ""}`}
              className="font-mono text-xs border border-border px-3 py-1.5 text-text-muted hover:text-amber-DEFAULT"
            >
              ← Prev
            </Link>
          )}
          <span className="font-mono text-xs text-text-dim self-center">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/admin/readings?auth=${adminPw}&page=${page + 1}${bandFilter ? `&band=${bandFilter}` : ""}`}
              className="font-mono text-xs border border-border px-3 py-1.5 text-text-muted hover:text-amber-DEFAULT"
            >
              Next →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
