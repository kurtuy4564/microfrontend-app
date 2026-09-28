export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'theme'

export function loadTheme(): Theme {
  try {
    const theme = localStorage.getItem(STORAGE_KEY)
    if (!theme) {
      return 'light'
    }
    const parsed: unknown = JSON.parse(theme)
    if (parsed === 'light' || parsed === 'dark') return parsed
    return 'light'
  } catch (e) {
    console.error('[host] Failed to load theme:', e)
    return 'light'
  }
}

export function saveTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme))
  } catch (e) {
    console.error('[host] Failed to save theme:', e)
  }
}
