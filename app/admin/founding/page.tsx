import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminFounding({
  searchParams,
}: {
  searchParams: { auth?: string };
}) {
  const adminPw = process.env.ADMIN_PASSWORD ?? "";
  if (searchParams.auth !== adminPw) {
    return <div className="p-8 text-red-400 font-mono">Unauthorized</div>;
  }

  const applications = await prisma.foundingApplication.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="min-h-screen bg-bg text-text">
      <nav className="border-b border-border px-6 py-4 flex items-center gap-6">
        <Link href={`/admin?auth=${adminPw}`} className="font-mono text-xs text-text-muted hover:text-amber-DEFAULT">
          ← Dashboard
        </Link>
        <span className="font-mono text-xs text-text-dim uppercase tracking-widest">
          Founding Applications ({applications.length})
        </span>
      </nav>
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">
        {applications.map((app) => (
          <div key={app.id} className={`border p-5 ${app.status === "pending" ? "border-border" : app.status === "approved" ? "border-green-500/30 bg-green-500/5" : "border-border opacity-50"}`}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="font-fraunces text-lg text-text">
                  {app.name ?? app.email}
                </div>
                <div className="font-mono text-xs text-text-dim">{app.email}</div>
              </div>
              <div className="font-mono text-xs text-text-faint">
                {new Date(app.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="font-mono text-xs space-y-1.5 mb-3">
              <div className="flex gap-3">
                <span className="text-text-dim">Status:</span>
                <span className={app.status === "approved" ? "text-green-400" : app.status === "rejected" ? "text-red-400" : "text-amber-DEFAULT"}>
                  {app.status}
                </span>
              </div>
              {app.geography && (
                <div className="flex gap-3">
                  <span className="text-text-dim">Geography:</span>
                  <span className="text-text-muted">{app.geography}</span>
                </div>
              )}
              {app.currentRole && (
                <div className="flex gap-3">
                  <span className="text-text-dim">Role:</span>
                  <span className="text-text-muted">{app.currentRole}</span>
                </div>
              )}
              {app.linkedinUrl && (
                <div className="flex gap-3">
                  <span className="text-text-dim">LinkedIn:</span>
                  <a href={app.linkedinUrl} target="_blank" rel="noopener" className="text-amber-DEFAULT hover:text-amber-bright truncate">
                    {app.linkedinUrl}
                  </a>
                </div>
              )}
            </div>
            <div className="font-sans text-sm text-text-muted border-t border-border pt-3">
              {app.whyJoin}
            </div>
          </div>
        ))}
        {applications.length === 0 && (
          <div className="text-center font-mono text-xs text-text-faint py-20">
            No applications yet
          </div>
        )}
      </div>
    </div>
  );
}
