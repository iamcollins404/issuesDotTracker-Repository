import { useEffect, useState } from 'react'
import CTA from '../components/landing/CTA'
import Features from '../components/landing/Features'
import Footer from '../components/landing/Footer'
import Hero from '../components/landing/Hero'
import Navbar from '../components/landing/Navbar'

function Index() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.js-fade .fade-in, .js-fade.fade-in')
    const cardsOnly = document.querySelectorAll<HTMLElement>('.js-fade')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    cardsOnly.forEach((el) => observer.observe(el))
    targets.forEach((el) => observer.observe(el))

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F5]">
      <Navbar />
      <main className="pt-32">
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />

      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-6 z-50 rounded-full bg-white px-5 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-black shadow-xl transition hover:bg-white/90"
          aria-label="Scroll to top"
        >
          top
        </button>
      )}
    </div>
  )
}

export default Index