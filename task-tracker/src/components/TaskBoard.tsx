import TaskList from './TaskList'
import type { Task } from '../type'

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Собрать обратную связь',
    description: 'Подготовить короткую форму для первых пользователей.',
    status: 'todo',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Продумать структуру проекта',
    description: 'Разложить основные разделы и пользовательские сценарии.',
    status: 'todo',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Настроить окружение',
    description: 'Проверить сборку и подготовить базовую конфигурацию.',
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: 4,
    title: 'Набросать экран доски',
    description: 'Определить состав колонок и карточки задач.',
    status: 'in-progress',
    priority: 'low',
  },
  {
    id: 5,
    title: 'Создать репозиторий',
    description: 'Добавить README и зафиксировать стартовую версию.',
    status: 'done',
    priority: 'medium',
  },
]

const columns = [
  { status: 'todo', title: 'К выполнению' },
  { status: 'in-progress', title: 'В процессе' },
  { status: 'done', title: 'Готово' },
] as const

export default function TaskBoard() {
  const completedCount = initialTasks.filter(task => task.status === 'done').length

  return (
    <main className='task-board'>
      <header className='board-header'>
        <div>
          <h1>Рабочая доска</h1>
        </div>
        <div
          className='board-progress'
          aria-label={`Выполнено задач: ${completedCount} из ${initialTasks.length}`}>
          <span className='progress-number'>{completedCount}</span>
          <span className='progress-label'>из {initialTasks.length} задач готово</span>
        </div>
      </header>

      <div className='task-columns'>
        {columns.map(column => (
          <TaskList
            key={column.status}
            tasks={initialTasks.filter(task => task.status === column.status)}
            title={column.title}
            status={column.status}
          />
        ))}
      </div>
    </main>
  )
}
