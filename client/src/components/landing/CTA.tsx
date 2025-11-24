import { Link } from 'react-router-dom'

function CTA() {
  return (
    <section id="cta" className="js-fade px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="fade-in text-large font-black lowercase">don&apos;t be left out</h2>
        <p className="fade-in mt-8 text-xl text-white/70">
          Start tracking issues now and never miss a deadline. Join the interview-ready community that trusts
          issues.tracker with their workflow.
        </p>

        <Link
          to="/auth/signup"
          className="card-hover fade-in mt-12 inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-lg font-bold uppercase tracking-wide text-black"
          style={{ transitionDelay: '0.15s' }}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
          start tracking now
        </Link>
      </div>
    </section>
  )
}

export default CTA
