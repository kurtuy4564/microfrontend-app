import { lazy, Suspense } from 'react'

const TaskBoard = lazy(() => import('taskTracker/TaskBoard'))
const FinancePanel = lazy(() => import('financeControl/FinancePanel'))

function App() {
  return (
    <main>
      <h1>Хост-приложение</h1>
      <Suspense fallback={<p>Загрузка Task Tracker...</p>}>
        <section>
          <h2>Task Tracker</h2>
          <TaskBoard />
        </section>
      </Suspense>
      <Suspense fallback={<p>Загрузка Finance Control...</p>}>
        <section>
          <h2>Finance Control</h2>
          <FinancePanel />
        </section>
      </Suspense>
    </main>
  )
}

export default App
