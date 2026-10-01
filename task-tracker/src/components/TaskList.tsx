import TaskCard from './TaskCard'
import { useTaskContext } from '../context/TaskContext'
import type { TaskStatus } from '../type'

type TaskListProps = {
  title: string
  status: TaskStatus
}

export default function TaskList({ title, status }: TaskListProps) {
  const { tasks } = useTaskContext()
  const columnTasks = tasks.filter(task => task.status === status)

  return (
    <section className={`task-column task-column--${status}`} aria-label={title}>
      <div className='column-heading'>
        <h2>{title}</h2>
        <span className='task-count'>{columnTasks.length}</span>
      </div>
      <div className='task-list'>
        {columnTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  )
}
