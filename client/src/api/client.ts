const DEFAULT_BASE_URL = 'http://localhost:5000'

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
  withAuth?: boolean
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE_URL

const JSON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export async function apiRequest<TResponse>(path: string, options: RequestOptions = {}): Promise<TResponse> {
  const { body, headers, withAuth, ...rest } = options

  const token = withAuth ? localStorage.getItem('authToken') : null

  const response = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      ...JSON_HEADERS,
      ...(headers ?? {}),
      // Backend expects 'authtoken' header (not Authorization)
      ...(token ? { authtoken: token } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = typeof data?.message === 'string' ? data.message : 'Request failed'
    throw new Error(message)
  }

  return data as TResponse
}

export { BASE_URL }

