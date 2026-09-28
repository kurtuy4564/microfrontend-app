const STORAGE_KEY = 'auth_user'

export interface User {
  name: string
  loginAt: string
}

export function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed: unknown = JSON.parse(raw)
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('name' in parsed) ||
      typeof parsed.name !== 'string' ||
      !parsed.name.trim() ||
      !('loginAt' in parsed) ||
      typeof parsed.loginAt !== 'string' ||
      Number.isNaN(Date.parse(parsed.loginAt))
    ) {
      return null
    }

    return { name: parsed.name.trim(), loginAt: parsed.loginAt }
  } catch (error) {
    console.error('[host] Failed to load user:', error)
    return null
  }
}

export function saveUser(name: string): User {
  const user: User = {
    name: name.trim(),
    loginAt: new Date().toISOString(),
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } catch (error) {
    console.error('[host] Failed to save user:', error)
  }

  return user
}

export function clearUser(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('[host] Failed to clear user:', error)
  }
}