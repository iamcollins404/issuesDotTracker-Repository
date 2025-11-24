import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { issues } from './data'

function ViewIssue() {
  const navigate = useNavigate()
  const { issueId } = useParams<{ issueId: string }>()

  const issue = useMemo(() => {
    if (!issueId) return undefined
    return issues.find((item) => item.id.replace('#', '') === issueId)
  }, [issueId])

  if (!issue) {
    return (
      <section className="space-y-6 text-white">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          back
        </button>
        <div className="rounded-3xl border border-dashed border-white/10 px-8 py-16 text-center text-white/60">
          <p className="text-lg font-semibold uppercase tracking-[0.3em] text-white/40">not found</p>
          <p className="mt-3 text-3xl font-black lowercase text-white">that issue slipped away</p>
          <p className="mt-2 text-sm text-white/50">return to your list and pick another entry.</p>
          <Link
            to="/app/issues"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white/90"
          >
            back to issues
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-8 text-white">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        back to list
      </button>

      <header className="rounded-3xl border border-white/5 bg-[#0A0A0A] px-8 py-10 shadow-[0_25px_70px_rgba(0,0,0,0.45)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">{issue.id}</p>
            <h1 className="mt-3 text-4xl font-black lowercase tracking-tight">{issue.title}</h1>
          </div>
          <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
            {issue.status}
          </span>
        </div>
        <p className="mt-5 max-w-3xl text-sm text-white/70">{issue.summary}</p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-3xl border border-white/5 bg-[#050505] px-6 py-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">reporter</p>
          <p className="mt-2 text-lg font-semibold">{issue.reporter}</p>
        </article>
        <article className="rounded-3xl border border-white/5 bg-[#050505] px-6 py-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">assignee</p>
          <p className="mt-2 text-lg font-semibold">{issue.assignee}</p>
        </article>
        <article className="rounded-3xl border border-white/5 bg-[#050505] px-6 py-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">tags</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em]">
            {issue.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-white/70">
                {tag}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <article className="rounded-3xl border border-white/5 bg-[#080808] px-7 py-7">
          <p className="text-sm uppercase tracking-[0.4em] text-white/50">timeline</p>
          <ul className="mt-5 space-y-3 text-white">
            {issue.activity.map((entry) => (
              <li key={entry.label} className="flex items-center justify-between text-sm">
                <span className="text-white/50 uppercase tracking-[0.3em]">{entry.label}</span>
                <span className="text-white">{entry.value}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-white/5 bg-[#080808] px-7 py-7">
          <p className="text-sm uppercase tracking-[0.4em] text-white/50">actions</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/app/issues"
              className="rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-white/30 hover:text-white"
            >
              reopen
            </Link>
            <button
              type="button"
              className="rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white/90"
            >
              resolve issue
            </button>
          </div>
        </article>
      </section>
    </section>
  )
}

export default ViewIssue

