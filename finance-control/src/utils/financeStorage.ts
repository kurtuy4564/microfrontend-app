export type TransactionType = 'income' | 'expense'

export type FinanceTransaction = {
  id: string
  type: TransactionType
  category: string
  amount: number
}

const STORAGE_KEY = 'finance_data'

function isFinanceTransaction(value: unknown): value is FinanceTransaction {
  if (typeof value !== 'object' || value === null) return false

  const transaction = value as Partial<FinanceTransaction>
  return typeof transaction.id === 'string'
    && (transaction.type === 'income' || transaction.type === 'expense')
    && typeof transaction.category === 'string'
    && typeof transaction.amount === 'number'
    && Number.isFinite(transaction.amount)
    && transaction.amount > 0
}

export function loadTransactions(): FinanceTransaction[] {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY)
    if (!storedData) return []

    const parsed: unknown = JSON.parse(storedData)
    return Array.isArray(parsed) ? parsed.filter(isFinanceTransaction) : []
  } catch {
    return []
  }
}

export function saveTransactions(transactions: FinanceTransaction[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  } catch (error) {
    console.error('[finance-control] Failed to save transactions:', error)
  }
}