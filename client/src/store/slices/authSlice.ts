import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  user: {
    userId: string
    email: string
    fullname: string
  } | null
  isAuthenticated: boolean
}

interface SetCredentialsPayload {
  token: string
  user: {
    userId: string
    email: string
    fullname: string
  }
}

// Initialize from localStorage if available
const getInitialToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken')
  }
  return null
}

const initialState: AuthState = {
  token: getInitialToken(),
  user: null,
  isAuthenticated: !!getInitialToken(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = true

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', action.payload.token)
      }
    },
    clearCredentials: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false

      // Remove from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken')
      }
    },
  },
})

export const { setCredentials, clearCredentials } = authSlice.actions
export default authSlice.reducer

