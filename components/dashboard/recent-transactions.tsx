"use client"

import { ArrowDownLeft, ArrowUpRight, TrendingUp, Banknote } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Transaction } from '@/lib/types'

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
        No recent transactions
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  )
}

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const getIcon = () => {
    switch (transaction.type) {
      case 'deposit':
        return <ArrowDownLeft className="h-4 w-4" />
      case 'withdrawal':
        return <ArrowUpRight className="h-4 w-4" />
      case 'earning':
        return <TrendingUp className="h-4 w-4" />
      case 'investment':
        return <Banknote className="h-4 w-4" />
      default:
        return <Banknote className="h-4 w-4" />
    }
  }

  const getIconStyles = () => {
    switch (transaction.type) {
      case 'deposit':
      case 'earning':
        return 'bg-chart-1/10 text-chart-1'
      case 'withdrawal':
        return 'bg-destructive/10 text-destructive'
      case 'investment':
        return 'bg-chart-3/10 text-chart-3'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getAmountPrefix = () => {
    switch (transaction.type) {
      case 'deposit':
      case 'earning':
        return '+'
      case 'withdrawal':
      case 'investment':
        return '-'
      default:
        return ''
    }
  }

  const getAmountColor = () => {
    switch (transaction.type) {
      case 'deposit':
      case 'earning':
        return 'text-chart-1'
      case 'withdrawal':
      case 'investment':
        return 'text-foreground'
      default:
        return 'text-foreground'
    }
  }

  const formatDate = (timestamp: { toDate: () => Date }) => {
    const date = timestamp.toDate()
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex items-center gap-3">
      <div className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full",
        getIconStyles()
      )}>
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium">{transaction.description}</p>
        <p className="text-xs text-muted-foreground">
          {formatDate(transaction.createdAt)}
        </p>
      </div>
      <div className="text-right">
        <p className={cn("text-sm font-semibold", getAmountColor())}>
          {getAmountPrefix()}${transaction.amount.toLocaleString()}
        </p>
        <p className={cn(
          "text-xs capitalize",
          transaction.status === 'completed' ? 'text-chart-1' : 
          transaction.status === 'pending' ? 'text-chart-2' : 'text-destructive'
        )}>
          {transaction.status}
        </p>
      </div>
    </div>
  )
}
