import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { toast } from 'sonner'
import { deleteIssue, getIssues, updateIssue, type IssueRecord } from '../../../api/issues'

const formatStatus = (status: string) => status.replace('_', ' ')

const formatDate = (iso: string, includeTime = true) => {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...(includeTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  }).format(date)
}

function ViewIssue() {
  const navigate = useNavigate()
  const { issueId } = useParams<{ issueId: string }>()
  const [issue, setIssue] = useState<IssueRecord | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [editIssue, setEditIssue] = useState({ title: '', description: '', status: 'pending' })

  useEffect(() => {
    const fetchIssue = async () => {
      if (!issueId) return
      try {
        const response = await getIssues()
        const match = response.data?.find((entry) => entry.issueId === issueId) ?? null
        if (!match) {
          toast.error('Issue not found')
        }
        setIssue(match)
        if (match) {
          setEditIssue({
            title: match.title,
            description: match.description ?? '',
            status: match.status,
          })
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to load issue'
        toast.error(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchIssue()
  }, [issueId])

  if (!issueId) {
    return null
  }

  const handleDeleteIssue = async () => {
    if (!issue) return
    setIsDeleting(true)
    try {
      const response = await deleteIssue(issue.issueId)
      toast.success(response.message ?? 'Issue deleted')
      navigate('/app/issues')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to delete issue'
      toast.error(message)
    } finally {
      setIsDeleting(false)
    }
  }

  if (!issue && !isLoading) {
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

  if (!issue) {
    return (
      <section className="space-y-6 text-white">
        <div className="rounded-3xl border border-white/5 bg-[#0A0A0A] px-8 py-10 text-white/60">
          loading issue details…
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
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">{issue.issueId}</p>
            <h1 className="mt-3 text-4xl font-black lowercase tracking-tight">{issue.title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
              {formatStatus(issue.status)}
            </span>
            <button
              type="button"
              onClick={() => setIsUpdateOpen(true)}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/40 hover:text-white"
            >
              edit issue
            </button>
            <button
              type="button"
              onClick={() => setIsDeleteOpen(true)}
              className="rounded-full border border-red-400/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-400 transition hover:border-red-300 hover:text-red-300"
            >
              delete issue
            </button>
          </div>
        </div>
        <p className="mt-5 max-w-3xl text-sm text-white/70">
          {issue.description ?? 'No description has been provided for this issue yet.'}
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-3xl border border-white/5 bg-[#050505] px-6 py-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">owner</p>
          <p className="mt-2 text-lg font-semibold">{issue.issueOwner}</p>
        </article>
        <article className="rounded-3xl border border-white/5 bg-[#050505] px-6 py-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">created</p>
          <p className="mt-2 text-lg font-semibold">{formatDate(issue.created_at, false)}</p>
        </article>
        <article className="rounded-3xl border border-white/5 bg-[#050505] px-6 py-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">updated</p>
          <p className="mt-2 text-lg font-semibold">{formatDate(issue.updated_at)}</p>
        </article>
      </section>

      <article className="rounded-3xl border border-white/5 bg-[#080808] px-7 py-7 text-white/70">
        <p className="text-sm uppercase tracking-[0.4em] text-white/50">description</p>
        <p className="mt-4">
          {issue.description ??
            'No description has been provided for this issue yet. collaborate with your team to add context.'}
        </p>
        <div className="mt-6">
          <Link
            to="/app/issues"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-white/30 hover:text-white"
          >
            back to issues
          </Link>
        </div>
      </article>

      {isDeleteOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => {
            if (!isDeleting) setIsDeleteOpen(false)
          }}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0B0B0B] p-10 text-white shadow-[0_35px_90px_rgba(0,0,0,0.65)]"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">delete issue</p>
            <h2 className="mt-3 text-3xl font-black lowercase tracking-tight">are you sure?</h2>
            <p className="mt-4 text-sm text-white/60">
              this action cannot be undone. we will remove the issue and all its context from your tracker.
            </p>
            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!isDeleting) setIsDeleteOpen(false)
                }}
                className="rounded-2xl border border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isDeleting}
              >
                cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteIssue}
                className="rounded-2xl bg-[#FF4D4D] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_15px_35px_rgba(255,77,77,0.35)] transition hover:bg-[#FF6B6B] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isDeleting}
              >
                {isDeleting ? 'deleting…' : 'delete issue'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isUpdateOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => {
            if (!isUpdating) setIsUpdateOpen(false)
          }}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0B0B0B] p-10 text-white shadow-[0_35px_90px_rgba(0,0,0,0.65)]"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">update issue</p>
            <h2 className="mt-3 text-3xl font-black lowercase tracking-tight">tweak the details</h2>
            <p className="mt-4 text-sm text-white/60">keep the copy short and intentional.</p>

            <form
              className="mt-6 space-y-5"
              onSubmit={async (event: FormEvent<HTMLFormElement>) => {
                event.preventDefault()
                if (!issue) return
                setIsUpdating(true)
                try {
                  const response = await updateIssue(issue.issueId, {
                    title: editIssue.title.trim() || undefined,
                    description: editIssue.description.trim(),
                    status: editIssue.status,
                  })
                  toast.success(response.message ?? 'Issue updated')
                  setIssue(response.data)
                  setEditIssue({
                    title: response.data.title,
                    description: response.data.description ?? '',
                    status: response.data.status,
                  })
                  setIsUpdateOpen(false)
                } catch (error) {
                  const message = error instanceof Error ? error.message : 'Unable to update issue'
                  toast.error(message)
                } finally {
                  setIsUpdating(false)
                }
              }}
            >
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-white/50">title</label>
                <input
                  type="text"
                  value={editIssue.title}
                  onChange={(event) => setEditIssue((prev) => ({ ...prev, title: event.target.value }))}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-white/50">description</label>
                <textarea
                  rows={4}
                  value={editIssue.description}
                  onChange={(event) => setEditIssue((prev) => ({ ...prev, description: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-white/50">status</label>
                <select
                  value={editIssue.status}
                  onChange={(event) => setEditIssue((prev) => ({ ...prev, status: event.target.value }))}
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
                    if (!isUpdating) setIsUpdateOpen(false)
                  }}
                  className="rounded-2xl border border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isUpdating}
                >
                  cancel
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isUpdating}
                >
                  {isUpdating ? 'updating…' : 'save changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default ViewIssue

