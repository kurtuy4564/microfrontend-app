import { createContext, useContext, useState, type PropsWithChildren } from 'react'
import type { Task } from '../type'

type NewTask = Omit<Task, 'id'>

type TaskContextValue = {
  tasks: Task[]
  addTask: (task: NewTask) => void
  updateTask: (taskId: number, changes: Partial<Task>) => void
  deleteTask: (taskId: number) => void
}

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

const TaskContext = createContext<TaskContextValue | null>(null)

export function TaskProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState(initialTasks)

  function addTask(task: NewTask) {
    setTasks(currentTasks => [
      ...currentTasks,
      {
        ...task,
        id: currentTasks.reduce((largestId, currentTask) => Math.max(largestId, currentTask.id), 0) + 1,
      },
    ])
  }

  function updateTask(taskId: number, changes: Partial<Task>) {
    setTasks(currentTasks =>
      currentTasks.map(task => task.id === taskId ? { ...task, ...changes } : task),
    )
  }

  function deleteTask(taskId: number) {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext must be used inside TaskProvider')
  }
  return context
}