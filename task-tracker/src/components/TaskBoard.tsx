import { TaskProvider } from '../context/TaskContext'
import TaskBoardContent from './TaskBoardContent'

export default function TaskBoard() {
  return (
    <TaskProvider>
      <TaskBoardContent />
    </TaskProvider>
  )
}
