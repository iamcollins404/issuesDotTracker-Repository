import { apiRequest } from './client'

export type IssueRecord = {
  issueId: string
  issueOwner: string
  title: string
  description: string | null
  status: 'pending' | 'in_progress' | 'completed'
  created_at: string
  updated_at: string
}

export type IssuesResponse = {
  success: boolean
  message: string
  data: IssueRecord[]
  count: number
}

export type CreateIssuePayload = {
  title: string
  description?: string
  status?: 'pending' | 'in_progress' | 'completed'
}

export type CreateIssueResponse = {
  success: boolean
  message: string
  data: IssueRecord
}

export type UpdateIssuePayload = {
  title?: string
  description?: string
  status?: 'pending' | 'in_progress' | 'completed'
}

export type UpdateIssueResponse = {
  success: boolean
  message: string
  data: IssueRecord
}

export async function getIssues() {
  return apiRequest<IssuesResponse>('/api/issues', {
    method: 'GET',
    withAuth: true,
  })
}

export async function createIssue(payload: CreateIssuePayload) {
  return apiRequest<CreateIssueResponse>('/api/issues/create', {
    method: 'POST',
    withAuth: true,
    body: payload,
  })
}

export async function updateIssue(issueId: string, payload: UpdateIssuePayload) {
  return apiRequest<UpdateIssueResponse>(`/api/issues/update/${issueId}`, {
    method: 'PUT',
    withAuth: true,
    body: payload,
  })
}

export async function deleteIssue(issueId: string) {
  return apiRequest<{ success: boolean; message: string }>(`/api/issues/delete/${issueId}`, {
    method: 'DELETE',
    withAuth: true,
  })
}

