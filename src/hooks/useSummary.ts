import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionsContexts'

export function useSummary() {
  const transactions = useContextSelector(
    TransactionsContext,
    (context) => context.transactions,
  )

  const summary = useMemo(() => {
    return transactions.reduce(
      (acomlator, transaction) => {
        if (transaction.type === 'income') {
          acomlator.income += transaction.price
          acomlator.total += transaction.price
        } else {
          acomlator.outcome += transaction.price
          acomlator.total -= transaction.price
        }
        return acomlator
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])
  return summary
}
