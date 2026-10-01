import { useState, type FormEvent } from 'react'
import { useTaskContext } from '../context/TaskContext'
import type { Task, TaskPriority, TaskStatus } from '../type'

const priorityLabels = {
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий',
}

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'К выполнению' },
  { value: 'in-progress', label: 'В процессе' },
  { value: 'done', label: 'Готово' },
]

type TaskCardProps = {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  const { updateTask, deleteTask } = useTaskContext()
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)

  function saveTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    updateTask(task.id, { title: trimmedTitle, description: description.trim() })
    setIsEditing(false)
  }

  return (
    <article className='task-card'>
      <div className={`task-priority task-priority--${task.priority}`}>
        <span className='priority-dot' />
        {priorityLabels[task.priority]} приоритет
      </div>

      {isEditing ? (
        <form className='task-edit-form' onSubmit={saveTask}>
          <label>
            Название
            <input
              required
              maxLength={100}
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </label>
          <label>
            Описание
            <textarea
              maxLength={300}
              rows={2}
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </label>
          <div className='task-actions'>
            <button className='task-action task-action--primary' type='submit'>Сохранить</button>
            <button className='task-action' type='button' onClick={() => setIsEditing(false)}>
              Отмена
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
        </>
      )}

      <div className='task-controls'>
        <label>
          Статус
          <select
            aria-label={`Статус задачи «${task.title}»`}
            value={task.status}
            onChange={event => updateTask(task.id, { status: event.target.value as TaskStatus })}>
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <label>
          Приоритет
          <select
            aria-label={`Приоритет задачи «${task.title}»`}
            value={task.priority}
            onChange={event => updateTask(task.id, { priority: event.target.value as TaskPriority })}>
            <option value='high'>Высокий</option>
            <option value='medium'>Средний</option>
            <option value='low'>Низкий</option>
          </select>
        </label>
      </div>

      {!isEditing && (
        <div className='task-actions'>
          <button className='task-action' type='button' onClick={() => setIsEditing(true)}>
            Изменить
          </button>
          <button className='task-action task-action--delete' type='button' onClick={() => deleteTask(task.id)}>
            Удалить
          </button>
        </div>
      )}
    </article>
  )
}