export type IssueStatus = 'pending' | 'in progress' | 'completed'

export type Issue = {
  id: string
  title: string
  status: IssueStatus
  updatedAt: string
  updatedSort: number
  summary: string
  reporter: string
  assignee: string
  tags: string[]
  activity: Array<{ label: string; value: string }>
}

export const issues: Issue[] = [
  {
    id: '#4835',
    title: 'Regression on safari auth callback',
    status: 'pending',
    updatedAt: '2h ago',
    updatedSort: 2,
    summary:
      'Safari users are hitting a blank screen when completing OAuth through the marketing site. Regression appeared after the 2.18 deploy.',
    reporter: 'you',
    assignee: 'maya blake',
    tags: ['auth', 'critical'],
    activity: [
      { label: 'created', value: 'Mar 2, 10:14 AM' },
      { label: 'last update', value: 'Mar 2, 1:42 PM' },
    ],
  },
  {
    id: '#4832',
    title: 'Webhook retries stuck in queued state',
    status: 'in progress',
    updatedAt: '5h ago',
    updatedSort: 5,
    summary: 'Webhook retries never move past the queued state when more than 200 payloads arrive per minute.',
    reporter: 'ops bot',
    assignee: 'devon miles',
    tags: ['webhook', 'backend'],
    activity: [
      { label: 'created', value: 'Mar 1, 6:02 PM' },
      { label: 'last update', value: 'Mar 2, 9:10 AM' },
    ],
  },
  {
    id: '#4826',
    title: 'Mentions panel crashing on long threads',
    status: 'in progress',
    updatedAt: '12h ago',
    updatedSort: 12,
    summary: 'Threads over 150 replies crash the composer when typing “@”. stack trace points to the avatar cache.',
    reporter: 'support',
    assignee: 'you',
    tags: ['mentions', 'editor'],
    activity: [
      { label: 'created', value: 'Feb 28, 11:40 AM' },
      { label: 'last update', value: 'Mar 1, 10:02 PM' },
    ],
  },
  {
    id: '#4822',
    title: 'Insight exports returning empty CSV',
    status: 'pending',
    updatedAt: '1d ago',
    updatedSort: 24,
    summary: 'CSV exports for weekly insights are blank when the dashboard uses stacked charts.',
    reporter: 'finance',
    assignee: 'alex cho',
    tags: ['analytics'],
    activity: [
      { label: 'created', value: 'Feb 26, 3:48 PM' },
      { label: 'last update', value: 'Feb 27, 8:15 AM' },
    ],
  },
  {
    id: '#4817',
    title: 'Badge colors not syncing to themes',
    status: 'completed',
    updatedAt: '2d ago',
    updatedSort: 48,
    summary: 'Custom workspace themes do not propagate badge palette updates until a hard refresh.',
    reporter: 'you',
    assignee: 'maya blake',
    tags: ['theming'],
    activity: [
      { label: 'created', value: 'Feb 20, 9:14 AM' },
      { label: 'last update', value: 'Feb 24, 6:33 PM' },
    ],
  },
]

