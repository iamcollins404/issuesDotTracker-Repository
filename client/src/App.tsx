// create a react router app with the index and not found

import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages imports
import Index from './pages/index'
import NotFound from './pages/notFound'
import Signup from './pages/auth/signup'
import Signin from './pages/auth/signin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />

        {/* auth routes */}
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />

        {/* not found page route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App