import { useEffect, useState, type MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'

const navLinks = [
  { label: 'explore', href: '#explore' },
  { label: 'features', href: '#features' },
  { label: 'contact', href: '#cta' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen((prev) => !prev)

  const closeMenu = () => setIsOpen(false)

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (isAuthenticated) {
      event.preventDefault()
      navigate('/app')
    }

    closeMenu()
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0E0E0E]/80 px-6 backdrop-blur-xl lg:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-6">
        <Link 
          to={isAuthenticated ? "/app" : "/"} 
          onClick={handleLogoClick} 
          className="text-2xl font-black tracking-tight lowercase"
        >
          issues.tracker
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {!isAuthenticated && navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm lowercase text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          {isAuthenticated ? (
            <>
              <Link
                to="/app"
                className="card-hover flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-transform"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                  />
                </svg>
                dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/auth/signin"
                className="text-sm lowercase text-white/60 transition-colors hover:text-white"
              >
                sign in
              </Link>
              <Link
                to="/auth/signup"
                className="card-hover flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-transform"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
                sign up
              </Link>
            </>
          )}
        </div>

        <button
          className="rounded-full border border-white/10 p-2 text-white md:hidden"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#0E0E0E]/90 px-6 py-10 backdrop-blur-xl md:hidden">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold lowercase text-white">navigate</p>
            <button
              className="rounded-full border border-white/10 p-2 text-white"
              aria-label="Close navigation"
              onClick={closeMenu}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-10 flex flex-col gap-6 text-center">
            {!isAuthenticated &&
              navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-lg lowercase text-white/80 transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            {isAuthenticated ? (
              <Link
                to="/app"
                onClick={closeMenu}
                className="rounded-2xl bg-white px-6 py-4 text-sm font-semibold uppercase text-black"
              >
                dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/auth/signin"
                  onClick={closeMenu}
                  className="text-lg lowercase text-white/80 transition hover:text-white"
                >
                  sign in
                </Link>
                <Link
                  to="/auth/signup"
                  onClick={closeMenu}
                  className="rounded-2xl bg-white px-6 py-4 text-sm font-semibold uppercase text-black"
                >
                  sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
