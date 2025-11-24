import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { getDashboardStats, type DashboardStatsResponse } from '../../api/dashboard'

const statCards = [
  { key: 'totalIssues', label: 'total issues', accent: '#FFFFFF' },
  { key: 'pending', label: 'pending', accent: '#FFC857' },
  { key: 'inProgress', label: 'in progress', accent: '#5B8CFF' },
  { key: 'completed', label: 'completed', accent: '#36E2B1' },
] as const

const statusTone: Record<string, string> = {
  pending: 'text-[#FFC857]',
  'in progress': 'text-[#5B8CFF]',
  completed: 'text-[#36E2B1]',
}

const formatStatus = (status: string) => status.replace('_', ' ')

const skeletonRows = Array.from({ length: 4 })

function Dashboard() {
  const [stats, setStats] = useState<DashboardStatsResponse['data'] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats()
        setStats(response.data)
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unable to load dashboard stats. please sign in again.'
        toast.error(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const recentIssues = useMemo(() => stats?.recentIssues ?? [], [stats])

  return (
    <section className="space-y-10">
      <header className="rounded-3xl border border-white/5 bg-white/5 px-8 py-10 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <p className="text-sm uppercase tracking-[0.45em] text-white/60">dashboard</p>
        <p className="mt-4 text-4xl font-black lowercase tracking-tight">your issues tracker ✦</p>
      </header>

      <section className="flex flex-col gap-8 xl:flex-row">
        <div className="flex-1 rounded-3xl border border-white/5 bg-[#080808] px-6 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="mb-4 flex flex-col gap-3 border-b border-white/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/50">recent activity</p>
              <p className="mt-1 text-2xl font-black lowercase text-white">latest issues in motion</p>
            </div>
            <Link
              to="/app/issues"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:border-white/30"
            >
              view all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5 text-left text-sm text-white/80">
              <thead className="text-white/40">
                <tr>
                  <th className="py-3 pr-4 font-medium">issue</th>
                  <th className="py-3 pr-4 font-medium">status</th>
                  <th className="py-3 pr-4 font-medium">owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading &&
                  skeletonRows.map((_, index) => (
                    <tr key={`skeleton-${index}`}>
                      <td className="py-4 pr-4">
                        <div className="skeleton h-3 w-28 rounded-full" />
                        <div className="skeleton mt-3 h-5 w-48 rounded-full" />
                      </td>
                      <td className="py-4 pr-4">
                        <div className="skeleton h-4 w-24 rounded-full" />
                      </td>
                      <td className="py-4 pr-4">
                        <div className="skeleton h-4 w-32 rounded-full" />
                      </td>
                    </tr>
                  ))}
                {!isLoading && recentIssues.length === 0 && (
                  <tr>
                    <td className="py-6 pr-4 text-white/40" colSpan={3}>
                      no recent updates yet — create a new issue to get things moving.
                    </td>
                  </tr>
                )}
                {!isLoading &&
                  recentIssues.map((issue) => {
                    const readableStatus = formatStatus(issue.status)
                    return (
                      <tr key={issue.issueId}>
                        <td className="py-4 pr-4">
                          <p className="text-xs uppercase tracking-[0.3em] text-white/40">{issue.issueId}</p>
                          <p className="mt-1 text-base font-semibold text-white">{issue.title}</p>
                        </td>
                        <td
                          className={`py-4 pr-4 text-xs font-semibold uppercase tracking-[0.3em] ${
                            statusTone[readableStatus] ?? 'text-white/60'
                          }`}
                        >
                          {readableStatus}
                        </td>
                        <td className="py-4 pr-4 text-sm text-white/60">{issue.issueOwner}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full shrink-0 space-y-4 xl:w-80">
          {statCards.map((card) => (
            <article
              key={card.key}
              className="rounded-3xl border border-white/5 bg-white/5 px-6 py-6 text-white shadow-[0_15px_40px_rgba(0,0,0,0.25)]"
            >
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.45em] text-white/60">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: card.accent }} aria-hidden="true" />
                {card.label}
              </p>
              <p className="mt-3 text-4xl font-black">
                {isLoading ? (
                  <span className="block">
                    <span className="skeleton block h-10 w-24 rounded-2xl" />
                  </span>
                ) : (
                  (stats?.[card.key] ?? 0).toLocaleString()
                )}
              </p>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}

export default Dashboard

