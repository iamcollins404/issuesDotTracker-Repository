import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'

interface AuthRedirectProps {
  children: React.ReactNode
}

// Redirects authenticated users away from auth pages (signin/signup)
function AuthRedirect({ children }: AuthRedirectProps) {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  if (isAuthenticated) {
    return <Navigate to="/app" replace />
  }

  return <>{children}</>
}

export default AuthRedirect

