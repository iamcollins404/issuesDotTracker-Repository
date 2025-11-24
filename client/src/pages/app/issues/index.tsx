import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import { toast } from 'sonner'
import { createIssue, getIssues, type IssueRecord } from '../../../api/issues'

const tabs = [
  { label: 'all', value: 'all' },
  { label: 'pending', value: 'pending' },
  { label: 'in progress', value: 'in_progress' },
  { label: 'completed', value: 'completed' },
] as const

const sortOptions = [
  { label: 'most recent', value: 'recent' },
  { label: 'oldest first', value: 'oldest' },
] as const

const formatStatus = (status: string) => status.replace('_', ' ')

const formatDate = (iso: string) => {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function IssuesIndex() {
  const [issues, setIssues] = useState<IssueRecord[]>([])
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['value']>('all')
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState<(typeof sortOptions)[number]['value']>('recent')
  const [sortMenuOpen, setSortMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'cards' | 'compact'>('cards')
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [newIssue, setNewIssue] = useState({ title: '', description: '', status: 'pending' })

  const loadIssues = async () => {
    try {
      setIsLoading(true)
      const response = await getIssues()
      setIssues(response.data ?? [])
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to load issues'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadIssues()
  }, [])

  const handleCreateIssue = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsCreating(true)
    try {
      const response = await createIssue({
        title: newIssue.title.trim(),
        description: newIssue.description.trim() || undefined,
        status: newIssue.status,
      })
      toast.success(response.message ?? 'Issue created')
      setIsCreateOpen(false)
      setNewIssue({ title: '', description: '', status: 'pending' })
      await loadIssues()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to create issue'
      toast.error(message)
    } finally {
      setIsCreating(false)
    }
  }

  const filteredIssues = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return issues
      .filter((issue) => {
        const matchesTab = activeTab === 'all' || issue.status === activeTab
        const matchesQuery = !normalizedQuery || issue.title.toLowerCase().includes(normalizedQuery)
        return matchesTab && matchesQuery
      })
      .sort((a, b) => {
        const aTime = new Date(a.created_at).getTime()
        const bTime = new Date(b.created_at).getTime()
        if (sortBy === 'recent') {
          return bTime - aTime
        }
        return aTime - bTime
      })
  }, [activeTab, issues, query, sortBy])

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-3 border-b border-white/5 pb-6 text-white">
        <p className="text-sm uppercase tracking-[0.4em] text-white/50">issues</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-4xl font-black lowercase tracking-tight">keep your issues flowing</p>
            <p className="mt-2 text-sm text-white/60">
              filter, search, and sort through work without breaking your calm.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white/90"
          >
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
          {isLoading && (
            <div className="rounded-3xl border border-white/5 bg-[#0A0A0A] px-6 py-5 text-sm text-white/50">
              syncing your issues…
            </div>
          )}

          {!isLoading &&
            filteredIssues.map((issue) => {
              const issuePath = `/app/issues/${issue.issueId}`
              const readableStatus = formatStatus(issue.status)
              return (
                <Link
                  key={issue.issueId}
                  to={issuePath}
                  className="block rounded-3xl border border-white/5 bg-[#0A0A0A] px-6 py-5 text-white shadow-[0_15px_45px_rgba(0,0,0,0.35)] transition hover:border-white/20 hover:bg-[#121212]"
                >
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em]">
                    <p className="text-white/40">{issue.issueId}</p>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-white/70">{readableStatus}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xl font-semibold">{issue.title}</p>
                    <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-black">
                      view issue
                    </span>
                  </div>
                  <div className="mt-4 text-sm text-white/60">updated {formatDate(issue.updated_at)}</div>
                </Link>
              )
            })}

          {!isLoading && filteredIssues.length === 0 && (
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
              {isLoading && (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-white/60">
                    syncing your issues…
                  </td>
                </tr>
              )}
              {!isLoading &&
                filteredIssues.map((issue) => {
                  const issuePath = `/app/issues/${issue.issueId}`
                  const readableStatus = formatStatus(issue.status)
                  return (
                    <tr
                      key={issue.issueId}
                      className="cursor-pointer border-b border-white/5 transition hover:bg-white/5 last:border-none"
                      onClick={() => {
                        window.location.href = issuePath
                      }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em]">
                          <p className="text-white/40">{issue.issueId}</p>
                          <span className="rounded-full border border-white/10 px-3 py-1 text-white/70">
                            {readableStatus}
                          </span>
                        </div>
                        <p className="mt-1 text-base font-semibold text-white">{issue.title}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/60">{formatDate(issue.updated_at)}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-black">
                          view issue
                        </span>
                      </td>
                    </tr>
                  )
                })}
              {!isLoading && filteredIssues.length === 0 && (
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

      {isCreateOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => {
            if (!isCreating) setIsCreateOpen(false)
          }}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0B0B0B] p-10 text-white shadow-[0_35px_90px_rgba(0,0,0,0.65)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/40">new issue</p>
                <h2 className="mt-2 text-3xl font-black lowercase tracking-tight">log something new</h2>
              </div>
              <button
                type="button"
                className="text-white/60 transition hover:text-white"
                onClick={() => {
                  if (!isCreating) setIsCreateOpen(false)
                }}
              >
                close
              </button>
            </div>

            <form className="space-y-5" onSubmit={handleCreateIssue}>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-white/50">title</label>
                <input
                  type="text"
                  value={newIssue.title}
                  onChange={(event) => setNewIssue((prev) => ({ ...prev, title: event.target.value }))}
                  required
                  placeholder="short description of the issue"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                />
              </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-white/50">description</label>
              <textarea
                value={newIssue.description}
                onChange={(event) => setNewIssue((prev) => ({ ...prev, description: event.target.value }))}
                rows={4}
                placeholder="add context or reproduction steps"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-white/50">status</label>
              <select
                value={newIssue.status}
                onChange={(event) => setNewIssue((prev) => ({ ...prev, status: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
              >
                <option value="pending">pending</option>
                <option value="in_progress">in progress</option>
                <option value="completed">completed</option>
              </select>
            </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (!isCreating) setIsCreateOpen(false)
                  }}
                  className="rounded-2xl border border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/20 hover:text-white"
                  disabled={isCreating}
                >
                  cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || !newIssue.title.trim()}
                  className="rounded-2xl bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isCreating ? 'creating...' : 'create issue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default IssuesIndex

