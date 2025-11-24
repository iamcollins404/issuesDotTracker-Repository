import { Link } from 'react-router-dom'

const stats = [
  { label: 'total issues', value: 128, accent: '#FFFFFF' },
  { label: 'pending', value: 54, accent: '#FFC857' },
  { label: 'in progress', value: 38, accent: '#5B8CFF' },
  { label: 'completed', value: 36, accent: '#36E2B1' },
]

const topIssues = [
  { id: '#4831', title: 'Auth callback delay on safari', status: 'pending', owner: 'you' },
  { id: '#4828', title: 'Payment retries stuck in loop', status: 'in progress', owner: 'maya' },
  { id: '#4824', title: 'Team mentions crash composer', status: 'in progress', owner: 'devon' },
  { id: '#4819', title: 'Insights export timing out', status: 'pending', owner: 'you' },
  { id: '#4805', title: 'Badge colors not syncing', status: 'completed', owner: 'alex' },
]

const statusTone: Record<string, string> = {
  pending: 'text-[#FFC857]',
  'in progress': 'text-[#5B8CFF]',
  completed: 'text-[#36E2B1]',
}

function Dashboard() {
  return (
    <section className="space-y-10">
      <header className="rounded-3xl border border-white/5 bg-white/5 px-8 py-10 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <p className="text-sm uppercase tracking-[0.45em] text-white/60">dashboard</p>
        <p className="mt-4 text-4xl font-black lowercase tracking-tight">your issues tracker ✦</p>
        <p className="mt-3 max-w-3xl text-sm text-white/70">
          stay focused on the work that matters. every panel here listens to your issues tracker in real time.
        </p>
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
                {topIssues.map((issue) => (
                  <tr key={issue.id}>
                    <td className="py-4 pr-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/40">{issue.id}</p>
                      <p className="mt-1 text-base font-semibold text-white">{issue.title}</p>
                    </td>
                    <td className={`py-4 pr-4 text-xs font-semibold uppercase tracking-[0.3em] ${statusTone[issue.status]}`}>
                      {issue.status}
                    </td>
                    <td className="py-4 pr-4 text-sm text-white/60">{issue.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full shrink-0 space-y-4 xl:w-80">
          {stats.map((item) => (
            <article
              key={item.label}
              className="rounded-3xl border border-white/5 bg-white/5 px-6 py-6 text-white shadow-[0_15px_40px_rgba(0,0,0,0.25)]"
            >
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.45em] text-white/60">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.accent }}
                  aria-hidden="true"
                />
                {item.label}
              </p>
              <p className="mt-3 text-4xl font-black">{item.value}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}

export default Dashboard

