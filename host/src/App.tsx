import { lazy, Suspense, useEffect, useState } from 'react'
import { loadTheme, saveTheme, type Theme } from './utils/storage'
import { clearUser, loadUser, saveUser, type User } from './utils/auth'
import RemoteErrorBoundary from './components/RemoteErrorBoundary'
import LoginForm from './components/LoginForm'

const TaskBoard = lazy(() => import('taskTracker/TaskBoard'))
const FinancePanel = lazy(() => import('financeControl/FinancePanel'))

function App() {
  const [theme, setTheme] = useState<Theme>(() => loadTheme())
  const [user, setUser] = useState<User | null>(() => loadUser())
  
  useEffect(() => {
    document.body.dataset.theme = theme
    saveTheme(theme)
  }, [theme])

  function toggleTheme() {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  function handleLogin(name: string) {
    setUser(saveUser(name))
  }

  function handleLogout() {
    clearUser()
    setUser(null)
  }

  if (!user) {
    return (
      <main className="login-page">
        <button className="theme-toggle" type="button" onClick={toggleTheme}>
          Переключить на {theme === 'light' ? 'тёмную' : 'светлую'} тему
        </button>
        <LoginForm onLogin={handleLogin} />
      </main>
    )
  }

  return (
    <main className="app-main">
      <header className="app-header">
        <h1>Привет, {user.name}!</h1>
        <div className="header-actions">
          <button type="button" onClick={toggleTheme}>
            Переключить на {theme === 'light' ? 'тёмную' : 'светлую'} тему
          </button>
          <button type="button" onClick={handleLogout}>Выйти</button>
        </div>
      </header>
      <RemoteErrorBoundary remoteName='Task Tracker'>
        <Suspense fallback={<p>Загрузка Task Tracker...</p>}>
          <section>
            <TaskBoard />
          </section>
        </Suspense>
      </RemoteErrorBoundary>
      <RemoteErrorBoundary remoteName='Finance Control'>
        <Suspense fallback={<p>Загрузка Finance Control...</p>}>
          <section>
            <FinancePanel />
          </section>
        </Suspense>
      </RemoteErrorBoundary>
    </main>
  )
}

export default App
