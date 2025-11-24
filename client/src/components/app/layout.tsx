import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ListChecks, LogOut, Settings, BarChart3 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { clearCredentials } from '../../store/slices/authSlice'

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
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const closeModal = () => {
    setIsSigningOut(false)
    setIsSignOutOpen(false)
  }

  const handleSignOut = () => {
    setIsSigningOut(true)
    
    // Show loading state first, then clear auth token and state after delay
    setTimeout(() => {
      dispatch(clearCredentials())
      closeModal()
      navigate('/')
    }, 1400)
  }

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="flex h-screen bg-[#050505] text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-white/5 bg-[#0A0A0A]/90 px-6 py-8 backdrop-blur-xl lg:flex">
        <button
          type="button"
          onClick={() => navigate('/app')}
          className="mb-10 text-left transition hover:opacity-80"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-[#FF5858]">issues</p>
          <p className="text-2xl font-black lowercase tracking-tight text-white">dot tracker</p>
        </button>

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

      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505]/95 px-4 py-6 sm:px-6 sm:py-8 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">menu</p>
            <button className="rounded-full border border-white/10 p-2 text-white" onClick={() => setIsMobileNavOpen(false)}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                onClick={() => setIsMobileNavOpen(false)}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-lg font-medium lowercase transition-all duration-200',
                    isActive ? 'bg-white text-black' : 'text-white/70 hover:bg-white/10 hover:text-white',
                  ].join(' ')
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF4D4D] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#FF6B6B]"
              onClick={() => {
                setIsMobileNavOpen(false)
                setIsSignOutOpen(true)
              }}
            >
              <LogOut className="h-4 w-4" />
              sign out
            </button>
          </nav>
        </div>
      )}

      <main className="flex-1 overflow-y-auto bg-[#050505] lg:pl-72">
        <div className="sticky top-0 z-40 block border-b border-white/5 bg-[#050505]/95 px-6 py-4 text-white backdrop-blur-sm lg:hidden">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/app')}
              className="text-left transition hover:opacity-80"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-[#FF5858]">issues</p>
              <p className="text-xl font-black lowercase tracking-tight text-white">dot tracker</p>
            </button>
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm uppercase tracking-[0.3em]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              menu
            </button>
          </div>
        </div>
        <div className="mx-auto min-h-screen max-w-5xl px-6 py-10 sm:px-8 sm:py-12">
          <div key={location.pathname} className="page-transition">
            <Outlet />
          </div>
        </div>
      </main>

      {showScrollTop && (
        <button
          type="button"
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-30 rounded-full border border-white/10 bg-white/10 p-3 text-white shadow-lg backdrop-blur-md transition hover:bg-white/20"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 15 7-7 7 7" />
          </svg>
        </button>
      )}

      {isSignOutOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => {
            if (!isSigningOut) closeModal()
          }}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0B0B0B] p-6 sm:p-8 md:p-10 text-white shadow-[0_30px_80px_rgba(0,0,0,0.65)]"
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

