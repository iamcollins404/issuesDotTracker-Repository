import { useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'explore', href: '#explore' },
  { label: 'features', href: '#features' },
  { label: 'contact', href: '#cta' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)

  const closeMenu = () => setIsOpen(false)

  const scrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    closeMenu()
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0E0E0E]/80 px-6 backdrop-blur-xl lg:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-6">
        <a href="#hero" onClick={scrollToTop} className="text-2xl font-black tracking-tight lowercase">
          issues.tracker
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm lowercase text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
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
        <div className="border-t border-white/5 bg-[#0E0E0E]/95 px-6 py-6 md:hidden" onClick={closeMenu}>
          <div className="flex flex-col gap-4 text-center">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm lowercase text-white/70 hover:text-white">
                {link.label}
              </a>
            ))}
            <Link to="/auth/signin" className="text-sm lowercase text-white/70 hover:text-white">
              sign in
            </Link>
            <Link
              to="/auth/signup"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase text-black"
            >
              sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
