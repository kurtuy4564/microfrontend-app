import { useEffect, useState, type FormEvent } from 'react'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { loadTransactions, saveTransactions, type FinanceTransaction, type TransactionType } from '../utils/financeStorage'

ChartJS.register(ArcElement, Tooltip, Legend)

const categories: Record<TransactionType, string[]> = {
  income: ['Зарплата', 'Подработка', 'Подарок', 'Другое'],
  expense: ['Продукты', 'Транспорт', 'Жильё', 'Здоровье', 'Развлечения', 'Другое'],
}
const chartColors = ['#34725a', '#d4775c', '#4dabf7', '#d3a64f', '#7b8794', '#8aa77a']
const currency = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' })

export default function FinancePanel() {
  const [transactions, setTransactions] = useState<FinanceTransaction[]>(loadTransactions)
  const [type, setType] = useState<TransactionType>('expense')
  const [category, setCategory] = useState(categories.expense[0])
  const [amount, setAmount] = useState('')

  useEffect(() => {
    saveTransactions(transactions)
  }, [transactions])

  const incomeTotal = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0)
  const expenseTotal = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0)
  const balance = incomeTotal - expenseTotal

  const expenseGroups = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce<Record<string, number>>((groups, transaction) => {
      groups[transaction.category] = (groups[transaction.category] ?? 0) + transaction.amount
      return groups
    }, {})
  const expenseCategories = Object.keys(expenseGroups)
  
  const chartData = {
    labels: expenseCategories,
    datasets: [{
      data: expenseCategories.map(expenseCategory => expenseGroups[expenseCategory]),
      backgroundColor: expenseCategories.map((_, index) => chartColors[index % chartColors.length]),
      borderWidth: 0,
      hoverOffset: 5,
    }],
  }

  function handleTypeChange(nextType: TransactionType) {
    setType(nextType)
    setCategory(categories[nextType][0])
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const parsedAmount = Number(amount)
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) return

    setTransactions(currentTransactions => [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        type,
        category,
        amount: parsedAmount,
      },
      ...currentTransactions,
    ])
    setAmount('')
  }

  function deleteTransaction(transactionId: string) {
    setTransactions(currentTransactions =>
      currentTransactions.filter(transaction => transaction.id !== transactionId),
    )
  }

  return (
    <section className='finance-panel'>
      <header className='finance-header'>
        <div>
          <p className='finance-eyebrow'>ЛИЧНЫЙ БЮДЖЕТ</p>
          <h2>Финансы</h2>
        </div>
        <p className='finance-balance-label'>Текущий баланс</p>
        <strong className={`finance-balance ${balance < 0 ? 'is-negative' : ''}`}>
          {currency.format(balance)}
        </strong>
      </header>

      <div className='finance-summary'>
        <div>
          <span>Доходы</span>
          <strong className='finance-income'>{currency.format(incomeTotal)}</strong>
        </div>
        <div>
          <span>Расходы</span>
          <strong className='finance-expense'>{currency.format(expenseTotal)}</strong>
        </div>
        <div>
          <span>Операции</span>
          <strong>{transactions.length}</strong>
        </div>
      </div>

      <div className='finance-workspace'>
        <form className='finance-form' onSubmit={handleSubmit}>
          <h3>Новая операция</h3>
          <div className='finance-type-switch' aria-label='Тип операции'>
            <button
              className={type === 'income' ? 'is-active' : ''}
              type='button'
              aria-pressed={type === 'income'}
              onClick={() => handleTypeChange('income')}>
              Доход
            </button>
            <button
              className={type === 'expense' ? 'is-active' : ''}
              type='button'
              aria-pressed={type === 'expense'}
              onClick={() => handleTypeChange('expense')}>
              Расход
            </button>
          </div>
          <label>
            Категория
            <select value={category} onChange={event => setCategory(event.target.value)}>
              {categories[type].map(item => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label>
            Сумма, ₽
            <input
              required
              type='number'
              min='0.01'
              step='0.01'
              value={amount}
              onChange={event => setAmount(event.target.value)}
              placeholder='0,00'
            />
          </label>
          <button className='finance-submit' type='submit'>Добавить операцию</button>
        </form>

        <section className='finance-chart-section' aria-label='Расходы по категориям'>
          <h3>Расходы по категориям</h3>
          {expenseCategories.length > 0 ? (
            <div className='finance-chart'>
              <Doughnut
                data={chartData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom', labels: { usePointStyle: true, padding: 18 } },
                    tooltip: {
                      callbacks: {
                        label: context => ` ${context.label}: ${currency.format(context.parsed)}`,
                      },
                    },
                  },
                }}
              />
            </div>
          ) : (
            <p className='finance-empty-chart'>Добавьте расход, чтобы увидеть диаграмму.</p>
          )}
        </section>
      </div>

      <section className='finance-transactions'>
        <h3>Последние операции</h3>
        {transactions.length === 0 ? (
          <p className='finance-empty-list'>Операций пока нет.</p>
        ) : (
          <ul>
            {transactions.map(transaction => (
              <li key={transaction.id}>
                <span className={`transaction-marker transaction-marker--${transaction.type}`} />
                <span className='transaction-category'>{transaction.category}</span>
                <span className={`transaction-amount transaction-amount--${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '−'}{currency.format(transaction.amount)}
                </span>
                <button
                  className='transaction-delete'
                  type='button'
                  aria-label={`Удалить операцию: ${transaction.category}`}
                  onClick={() => deleteTransaction(transaction.id)}>
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  )
}