import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { signUp } from '../../api/auth'
import Footer from '../../components/landing/Footer'
import Navbar from '../../components/landing/Navbar'

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ fullname: '', email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await signUp(formData)
      toast.success(response.message ?? 'Account created')
      navigate('/auth/signin')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to sign up')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F5]">
      <Navbar />
      <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 pt-32 pb-24">
        <div className="w-full max-w-md rounded-3xl border border-white/5 bg-[#1A1A1A] p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">signup</p>
            <h1 className="mt-2 text-3xl font-semibold lowercase">create an account</h1>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm uppercase tracking-wide text-white/70">full name</label>
              <input
                name="fullname"
                type="text"
                placeholder="Ada Lovelace"
                value={formData.fullname}
                onChange={handleChange}
                required
                autoComplete="name"
                className="w-full rounded-2xl border border-white/10 bg-[#111111] px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm uppercase tracking-wide text-white/70">email</label>
              <input
                name="email"
                type="email"
                placeholder="ada@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full rounded-2xl border border-white/10 bg-[#111111] px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm uppercase tracking-wide text-white/70">password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="w-full rounded-2xl border border-white/10 bg-[#111111] px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="card-hover mt-6 w-full rounded-full bg-white py-3 text-sm font-bold uppercase tracking-wide text-black disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'creating...' : 'sign up'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Signup
