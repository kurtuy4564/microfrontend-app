import type { FinanceTransaction } from '../utils/financeStorage'

type FinanceTransactionListProps = {
  transactions: FinanceTransaction[]
  onDelete: (transactionId: string) => void
}

const currency = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' })

export default function FinanceTransactionList({
  transactions,
  onDelete,
}: FinanceTransactionListProps) {
  return (
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
                onClick={() => onDelete(transaction.id)}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}