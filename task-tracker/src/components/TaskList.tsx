import type { Task, TaskStatus } from '../type'

const priorityLabels = {
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий',
}

export default function TaskList({
  tasks,
  title,
  status,
}: {
  tasks: Task[]
  title: string
  status: TaskStatus
}) {
  return (
    <section className={`task-column task-column--${status}`} aria-label={title}>
      <div className='column-heading'>
        <h2>{title}</h2>
        <span className='task-count'>{tasks.length}</span>
      </div>
      <div className='task-list'>
        {tasks.map(task => (
          <article className='task-card' key={task.id}>
            <div className={`task-priority task-priority--${task.priority}`}>
              <span className='priority-dot' />
              {priorityLabels[task.priority]} приоритет
            </div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
