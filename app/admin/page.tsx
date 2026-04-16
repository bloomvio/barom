import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getStats() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(today.getTime() - 7 * 86400 * 1000);
  const monthAgo = new Date(today.getTime() - 30 * 86400 * 1000);

  const [
    totalReadings,
    todayReadings,
    weekReadings,
    monthReadings,
    emailCaptures,
    paidUsers,
    foundingMembers,
    foundingApplications,
    scoreDistribution,
  ] = await Promise.all([
    prisma.reading.count(),
    prisma.reading.count({ where: { createdAt: { gte: today } } }),
    prisma.reading.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.reading.count({ where: { createdAt: { gte: monthAgo } } }),
    prisma.user.count(),
    prisma.user.count({ where: { subscriptionStatus: { in: ["active", "lifetime"] } } }),
    prisma.user.count({ where: { isFoundingMember: true } }),
    prisma.foundingApplication.count({ where: { status: "pending" } }),
    prisma.reading.groupBy({ by: ["band"], _count: { band: true } }),
  ]);

  return {
    totalReadings,
    todayReadings,
    weekReadings,
    monthReadings,
    emailCaptures,
    paidUsers,
    foundingMembers,
    foundingApplications,
    scoreDistribution,
  };
}

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: { auth?: string };
}) {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("admin_auth")?.value;
  const adminPw = process.env.ADMIN_PASSWORD ?? "";

  const isAuth =
    adminCookie === adminPw || searchParams.auth === adminPw;

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-bg text-text flex items-center justify-center p-4">
        <form
          method="GET"
          action="/admin"
          className="border border-border bg-surface p-8 w-full max-w-sm"
        >
          <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-6">
            Admin access
          </div>
          <input
            type="password"
            name="auth"
            placeholder="Password"
            className="w-full bg-bg border border-border text-text font-mono text-sm px-4 py-3 mb-4 focus:border-amber focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-amber text-bg font-mono text-xs uppercase tracking-widest py-3 hover:bg-amber-bright"
          >
            Authenticate →
          </button>
        </form>
      </div>
    );
  }

  const stats = await getStats();

  const StatCard = ({
    label,
    value,
    sub,
  }: {
    label: string;
    value: string | number;
    sub?: string;
  }) => (
    <div className="border border-border bg-surface p-5">
      <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-2">
        {label}
      </div>
      <div className="font-fraunces text-3xl text-amber">{value}</div>
      {sub && <div className="font-mono text-xs text-text-faint mt-1">{sub}</div>}
    </div>
  );

  return (
    <div className="min-h-screen bg-bg text-text">
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="font-fraunces text-xl text-text">
          BAROM Admin
        </div>
        <div className="flex gap-4">
          {[
            { href: "/admin", label: "Dashboard" },
            { href: "/admin/readings", label: "Readings" },
            { href: "/admin/founding", label: "Founding" },
            { href: "/admin/users", label: "Users" },
            { href: "/admin/pipeline", label: "Pipeline" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={`${href}?auth=${adminPw}`}
              className="font-mono text-xs text-text-muted hover:text-amber uppercase tracking-widest"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-6">
          Overview
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard label="Readings today" value={stats.todayReadings} />
          <StatCard label="Readings this week" value={stats.weekReadings} />
          <StatCard label="Readings this month" value={stats.monthReadings} />
          <StatCard label="Total readings" value={stats.totalReadings} />
          <StatCard label="Email captures" value={stats.emailCaptures} />
          <StatCard label="Paid subscribers" value={stats.paidUsers} />
          <StatCard
            label="Founding members"
            value={stats.foundingMembers}
            sub="of 100"
          />
          <StatCard
            label="Pending applications"
            value={stats.foundingApplications}
            sub="founding cohort"
          />
        </div>

        <div className="border border-border bg-surface p-6">
          <div className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">
            Score distribution by band
          </div>
          <div className="space-y-2">
            {stats.scoreDistribution.map((item) => (
              <div
                key={item.band}
                className="flex items-center justify-between font-mono text-xs"
              >
                <span className="text-text-muted capitalize">{item.band}</span>
                <span className="text-text">{item._count.band}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
