import { useState, type FormEvent } from 'react'
import { useTaskContext } from '../context/TaskContext'
import type { TaskPriority, TaskStatus } from '../type'
import TaskList from './TaskList'

const columns = [
  { status: 'todo', title: 'К выполнению' },
  { status: 'in-progress', title: 'В процессе' },
  { status: 'done', title: 'Готово' },
] as const

const emptyTaskForm = {
  title: '',
  description: '',
  status: 'todo' as TaskStatus,
  priority: 'medium' as TaskPriority,
}

export default function TaskBoardContent() {
  const { tasks, addTask } = useTaskContext()
  const [showNewTaskForm, setShowNewTaskForm] = useState(false)
  const [newTask, setNewTask] = useState(emptyTaskForm)
  const completedCount = tasks.filter(task => task.status === 'done').length

  function handleCreateTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = newTask.title.trim()
    if (!title) return

    addTask({ ...newTask, title, description: newTask.description.trim() })
    setNewTask(emptyTaskForm)
    setShowNewTaskForm(false)
  }

  return (
    <main className='task-board'>
      <header className='board-header'>
        <h1>Рабочая доска</h1>
        <div className='board-header-actions'>
          <div
            className='board-progress'
            aria-label={`Выполнено задач: ${completedCount} из ${tasks.length}`}>
            <span className='progress-number'>{completedCount}</span>
            <span className='progress-label'>из {tasks.length} задач готово</span>
          </div>
          <button
            className='task-add-button'
            type='button'
            aria-expanded={showNewTaskForm}
            onClick={() => setShowNewTaskForm(isOpen => !isOpen)}>
            {showNewTaskForm ? 'Отмена' : '+ Добавить задачу'}
          </button>
        </div>
      </header>

      {showNewTaskForm && (
        <form className='task-form task-form--new' onSubmit={handleCreateTask}>
          <label>
            Название
            <input
              autoFocus
              required
              maxLength={100}
              value={newTask.title}
              onChange={event => setNewTask({ ...newTask, title: event.target.value })}
              placeholder='Например, подготовить отчет'
            />
          </label>
          <label>
            Описание
            <textarea
              maxLength={300}
              value={newTask.description}
              onChange={event => setNewTask({ ...newTask, description: event.target.value })}
              placeholder='Краткое описание задачи'
              rows={2}
            />
          </label>
          <label>
            Статус
            <select
              value={newTask.status}
              onChange={event => setNewTask({ ...newTask, status: event.target.value as TaskStatus })}>
              {columns.map(column => (
                <option key={column.status} value={column.status}>{column.title}</option>
              ))}
            </select>
          </label>
          <label>
            Приоритет
            <select
              value={newTask.priority}
              onChange={event => setNewTask({ ...newTask, priority: event.target.value as TaskPriority })}>
              <option value='high'>Высокий</option>
              <option value='medium'>Средний</option>
              <option value='low'>Низкий</option>
            </select>
          </label>
          <div className='task-form-actions'>
            <button className='task-add-button' type='submit'>Создать задачу</button>
          </div>
        </form>
      )}

      <div className='task-columns'>
        {columns.map(column => (
          <TaskList key={column.status} title={column.title} status={column.status} />
        ))}
      </div>
    </main>
  )
}