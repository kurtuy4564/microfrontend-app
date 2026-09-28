import { useState, type FormEvent } from 'react'

type Props = {
  onLogin: (name: string) => void
}

export default function LoginForm({ onLogin }: Props) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedName = name.trim()

    if (trimmedName.length < 2) {
      setError('Имя должно содержать минимум 2 символа')
      return
    }

    setError('')
    onLogin(trimmedName)
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>Вход</h1>
      <label htmlFor="login-name">Имя</label>
      <input
        id="login-name"
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
        placeholder="Введите имя"
        autoFocus
        required
      />
      {error && <p className="login-error" role="alert">{error}</p>}
      <button type="submit" disabled={!name.trim()}>
        Войти
      </button>
    </form>
  )
}