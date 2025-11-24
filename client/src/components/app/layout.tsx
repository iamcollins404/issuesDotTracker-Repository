import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ListChecks, LogOut, Settings, BarChart3 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'

type NavItem = {
  label: string
  to: string
  icon: LucideIcon
  end?: boolean
}

const navItems: NavItem[] = [
  { label: 'dashboard', to: '/app', icon: LayoutDashboard, end: true },
  { label: 'my issues', to: '/app/issues', icon: ListChecks },
  { label: 'reports', to: '/app/reports', icon: BarChart3 },
  { label: 'settings', to: '/app/settings', icon: Settings },
]

function AppLayout() {
  const [isSignOutOpen, setIsSignOutOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const navigate = useNavigate()

  const closeModal = () => {
    setIsSigningOut(false)
    setIsSignOutOpen(false)
  }

  const handleSignOut = () => {
    setIsSigningOut(true)
    setTimeout(() => {
      closeModal()
      navigate('/')
    }, 1400)
  }

  return (
    <div className="flex h-screen bg-[#050505] text-white">
      <aside className="fixed inset-y-0 left-0 flex w-72 flex-col border-r border-white/5 bg-[#0A0A0A]/90 px-6 py-8 backdrop-blur-xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.4em] text-[#FF5858]">issues</p>
          <p className="text-2xl font-black lowercase tracking-tight text-white">dot tracker</p>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium lowercase transition-all duration-200',
                  isActive
                    ? 'bg-white text-black shadow-lg shadow-black/30'
                    : 'text-white/60 hover:bg-white/5 hover:text-white',
                ].join(' ')
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}

          <div className="mt-auto border-t border-white/5 pt-6">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF4D4D] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#FF6B6B]"
              onClick={() => setIsSignOutOpen(true)}
            >
              <LogOut className="h-4 w-4" />
              sign out
            </button>
          </div>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[#050505] pl-72">
        <div className="mx-auto min-h-screen max-w-5xl px-8 py-12">
          <Outlet />
        </div>
      </main>

      {isSignOutOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => {
            if (!isSigningOut) closeModal()
          }}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0B0B0B] p-10 text-white shadow-[0_30px_80px_rgba(0,0,0,0.65)]"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">sign out</p>
            <h2 className="mt-3 text-3xl font-black lowercase">ready to unplug?</h2>
            <p className="mt-4 text-sm text-white/60">
              we&apos;ll keep your workspace warm. hop back anytime to keep the flow going.
            </p>
            <div className="mt-10 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-2xl border border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/20 hover:text-white"
                disabled={isSigningOut}
              >
                stay in
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className={`rounded-2xl px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_15px_35px_rgba(255,77,77,0.35)] transition ${
                  isSigningOut ? 'bg-[#FF4D4D]/60' : 'bg-[#FF4D4D] hover:bg-[#FF6B6B]'
                }`}
              >
                {isSigningOut ? 'signing out...' : 'sign out'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppLayout

