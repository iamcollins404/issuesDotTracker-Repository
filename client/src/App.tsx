// create a react router app with the index and not found

import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages imports
import Index from './pages/index'
import NotFound from './pages/notFound'
import Signup from './pages/auth/signup'
import Signin from './pages/auth/signin'
import AppLayout from './components/app/layout'
import Dashboard from './pages/app/dashboard'
import IssuesIndex from './pages/app/issues'
import ViewIssue from './pages/app/issues/viewIssue'
import Reports from './pages/app/reports'
import Settings from './pages/app/settings'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AuthRedirect from './components/auth/AuthRedirect'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />

        {/* auth routes - redirect to /app if already authenticated */}
        <Route
          path="/auth/signin"
          element={
            <AuthRedirect>
              <Signin />
            </AuthRedirect>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <AuthRedirect>
              <Signup />
            </AuthRedirect>
          }
        />

        {/* app area - protected routes */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="issues" element={<IssuesIndex />} />
          <Route path="issues/:issueId" element={<ViewIssue />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* not found page route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App