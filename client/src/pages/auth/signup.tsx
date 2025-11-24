import Footer from '../../components/landing/Footer'
import Navbar from '../../components/landing/Navbar'

function Signup() {
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F5]">
      <Navbar />
      <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 pt-32 pb-24">
        <div className="w-full max-w-md rounded-3xl border border-white/5 bg-[#1A1A1A] p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">signup</p>
            <h1 className="mt-2 text-3xl font-semibold lowercase">create an account</h1>
          </div>

          <form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm uppercase tracking-wide text-white/70">full name</label>
              <input
                type="text"
                placeholder="Ada Lovelace"
                className="w-full rounded-2xl border border-white/10 bg-[#111111] px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm uppercase tracking-wide text-white/70">email</label>
              <input
                type="email"
                placeholder="ada@example.com"
                className="w-full rounded-2xl border border-white/10 bg-[#111111] px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm uppercase tracking-wide text-white/70">password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/10 bg-[#111111] px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="card-hover mt-6 w-full rounded-full bg-white py-3 text-sm font-bold uppercase tracking-wide text-black"
            >
              sign up
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Signup