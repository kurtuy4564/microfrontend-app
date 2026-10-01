export type TaskStatus = 'todo' | 'in-progress' | 'done'
export type TaskPriority = 'high' | 'medium' | 'low'

export type Task = {
  id: number
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
}
