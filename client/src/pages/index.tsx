import { useEffect } from 'react'
import CTA from '../components/landing/CTA'
import Features from '../components/landing/Features'
import Footer from '../components/landing/Footer'
import Hero from '../components/landing/Hero'
import Navbar from '../components/landing/Navbar'

function Index() {
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

    return () => observer.disconnect()
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
    </div>
  )
}

export default Index