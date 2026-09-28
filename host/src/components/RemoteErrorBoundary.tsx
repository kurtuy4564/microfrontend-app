import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  remoteName: string
}

type State = {
  hasError: boolean
}

export default class RemoteErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[host] Failed to load ${this.props.remoteName}:`, error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section role="alert">
          <h2>{this.props.remoteName} временно недоступен</h2>
          <p>Проверьте, запущен ли микрофронтенд, затем обновите страницу.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Обновить страницу
          </button>
        </section>
      )
    }

    return this.props.children
  }
}