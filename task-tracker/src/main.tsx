import { createRoot } from 'react-dom/client'
import './index.css'
import TaskBoard from './components/TaskBoard'

createRoot(document.getElementById('root')!).render(<TaskBoard />)
