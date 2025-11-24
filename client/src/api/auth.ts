import { apiRequest } from './client'

type SignInPayload = {
  email: string
  password: string
}

type SignInResponse = {
  success: boolean
  message: string
  data: {
    user: {
      userId: string
      fullname: string
      email: string
      created_at: string
      updated_at: string
    }
    authtoken: string
  }
}

type SignUpPayload = {
  fullname: string
  email: string
  password: string
}

type SignUpResponse = {
  success: boolean
  message: string
  data: {
    userId: string
    fullname: string
    email: string
    created_at: string
    updated_at: string
  }
}

export async function signIn(payload: SignInPayload): Promise<SignInResponse> {
  const response = await apiRequest<SignInResponse>('/api/auth/signin', {
    method: 'POST',
    body: payload,
  })

  // Note: Token storage is now handled by Redux in the component
  // This function just returns the response

  return response
}

export async function signUp(payload: SignUpPayload): Promise<SignUpResponse> {
  return apiRequest<SignUpResponse>('/api/auth/signup', {
    method: 'POST',
    body: payload,
  })
}

