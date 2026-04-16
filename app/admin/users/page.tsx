import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminUsers({
  searchParams,
}: {
  searchParams: { auth?: string; page?: string };
}) {
  const adminPw = process.env.ADMIN_PASSWORD ?? "";
  if (searchParams.auth !== adminPw) {
    return <div className="p-8 text-red-400 font-mono">Unauthorized</div>;
  }

  const page = parseInt(searchParams.page ?? "1");
  const limit = 50;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
      include: { _count: { select: { readings: true } } },
    }),
    prisma.user.count(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-bg text-text">
      <nav className="border-b border-border px-6 py-4 flex items-center gap-6">
        <Link href={`/admin?auth=${adminPw}`} className="font-mono text-xs text-text-muted hover:text-amber">
          ← Dashboard
        </Link>
        <span className="font-mono text-xs text-text-dim uppercase tracking-widest">
          Users ({total})
        </span>
      </nav>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-xs border border-border">
            <thead>
              <tr className="border-b border-border bg-surface">
                {["Email", "Tier", "Status", "Readings", "Founding", "Joined"].map((h) => (
                  <th key={h} className="text-left p-3 text-text-dim uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border hover:bg-surface">
                  <td className="p-3 text-text">{u.email}</td>
                  <td className="p-3">
                    <span className={u.subscriptionTier !== "free" ? "text-amber" : "text-text-faint"}>
                      {u.subscriptionTier}
                    </span>
                  </td>
                  <td className="p-3 text-text-muted">{u.subscriptionStatus}</td>
                  <td className="p-3 text-text-muted">{u._count.readings}</td>
                  <td className="p-3">
                    {u.isFoundingMember ? (
                      <span className="text-amber">#{u.foundingNumber}</span>
                    ) : (
                      <span className="text-text-faint">—</span>
                    )}
                  </td>
                  <td className="p-3 text-text-faint">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-3 mt-6">
          {page > 1 && (
            <Link href={`/admin/users?auth=${adminPw}&page=${page - 1}`} className="font-mono text-xs border border-border px-3 py-1.5 text-text-muted hover:text-amber">
              ← Prev
            </Link>
          )}
          <span className="font-mono text-xs text-text-dim self-center">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Link href={`/admin/users?auth=${adminPw}&page=${page + 1}`} className="font-mono text-xs border border-border px-3 py-1.5 text-text-muted hover:text-amber">
              Next →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
