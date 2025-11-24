import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import { issues } from './data'

const tabs = [
  { label: 'all', value: 'all' },
  { label: 'pending', value: 'pending' },
  { label: 'in progress', value: 'in progress' },
  { label: 'completed', value: 'completed' },
] as const

const sortOptions = [
  { label: 'most recent', value: 'recent' },
  { label: 'oldest first', value: 'oldest' },
] as const

function IssuesIndex() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['value']>('all')
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState<(typeof sortOptions)[number]['value']>('recent')
  const [sortMenuOpen, setSortMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'cards' | 'compact'>('cards')

  const filteredIssues = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return issues
      .filter((issue) => {
        const matchesTab = activeTab === 'all' || issue.status === activeTab
        const matchesQuery = !normalizedQuery || issue.title.toLowerCase().includes(normalizedQuery)
        return matchesTab && matchesQuery
      })
      .sort((a, b) => {
        if (sortBy === 'recent') {
          return a.updatedSort - b.updatedSort
        }
        return b.updatedSort - a.updatedSort
      })
  }, [activeTab, query, sortBy])

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-3 border-b border-white/5 pb-6 text-white">
        <p className="text-sm uppercase tracking-[0.4em] text-white/50">issues</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-4xl font-black lowercase tracking-tight">keep your queue flowing</p>
            <p className="mt-2 text-sm text-white/60">
              filter, search, and sort through work without breaking your calm.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white/90">
            <Plus className="h-4 w-4" />
            new issue
          </button>
        </div>
      </header>

      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
              activeTab === tab.value ? 'bg-white text-black' : 'border border-white/10 text-white/60 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-[#080808] px-6 py-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
          <Search className="h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="search by title"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end lg:w-auto">
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => setSortMenuOpen((prev) => !prev)}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:text-white"
            >
              sort by
            </button>

            {sortMenuOpen && (
              <div className="absolute right-0 z-10 mt-2 w-44 rounded-lg border border-white/10 bg-[#0F0F0F] p-1 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`block w-full rounded-md px-3 py-2 text-left text-sm capitalize text-white/70 transition hover:bg-white/5 hover:text-white ${
                      sortBy === option.value ? 'bg-white/5 text-white' : ''
                    }`}
                    onClick={() => {
                      setSortBy(option.value)
                      setSortMenuOpen(false)
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#0F0F0F] px-2 py-1">
            {(['cards', 'compact'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`rounded-md px-3 py-1 text-xs capitalize transition ${
                  viewMode === mode ? 'bg-white/90 text-black font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="space-y-4">
          {filteredIssues.map((issue) => {
            const issuePath = `/app/issues/${issue.id.replace('#', '')}`
            return (
              <article
                key={issue.id}
                className="rounded-3xl border border-white/5 bg-[#0A0A0A] px-6 py-5 text-white shadow-[0_15px_45px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em]">
                  <p className="text-white/40">{issue.id}</p>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-white/70">{issue.status}</span>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xl font-semibold">{issue.title}</p>
                  <Link
                    to={issuePath}
                    className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white/90"
                  >
                    view issue
                  </Link>
                </div>
                <div className="mt-4 text-sm text-white/60">updated {issue.updatedAt}</div>
              </article>
            )
          })}

          {filteredIssues.length === 0 && (
            <div className="rounded-3xl border border-dashed border-white/10 px-8 py-16 text-center text-white/60">
              <p className="text-lg font-semibold uppercase tracking-[0.3em] text-white/40">no matches</p>
              <p className="mt-3 text-3xl font-black lowercase text-white">try another filter</p>
              <p className="mt-2 text-sm text-white/50">adjust your tabs or search term to find the work you need.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/5 bg-[#0A0A0A] shadow-[0_15px_45px_rgba(0,0,0,0.35)]">
          <table className="min-w-full text-left text-sm text-white/80">
            <thead className="border-b border-white/5 text-white/50">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.3em]">issue</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.3em]">updated</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.3em]">action</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.map((issue) => {
                const issuePath = `/app/issues/${issue.id.replace('#', '')}`
                return (
                  <tr key={issue.id} className="border-b border-white/5 last:border-none">
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em]">
                        <p className="text-white/40">{issue.id}</p>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-white/70">{issue.status}</span>
                      </div>
                      <p className="mt-1 text-base font-semibold text-white">{issue.title}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">{issue.updatedAt}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={issuePath}
                        className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white/90"
                      >
                        view issue
                      </Link>
                    </td>
                  </tr>
                )
              })}
              {filteredIssues.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-white/60">
                    no matches — adjust your filters to see data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default IssuesIndex

