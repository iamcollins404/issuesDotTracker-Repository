import { apiRequest } from './client'

export type DashboardStatsResponse = {
  success: boolean
  message: string
  data: {
    totalIssues: number
    pending: number
    inProgress: number
    completed: number
    recentIssues: Array<{
      issueId: string
      issueOwner: string
      title: string
      description: string | null
      status: 'pending' | 'in_progress' | 'completed'
      created_at: string
      updated_at: string
    }>
  }
}

export async function getDashboardStats() {
  return apiRequest<DashboardStatsResponse>('/api/dashboard/stats', {
    method: 'GET',
    withAuth: true,
  })
}

