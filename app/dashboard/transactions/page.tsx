"use client"

import { useState } from 'react'
import { Search, Download, Filter, ArrowDownLeft, ArrowUpRight, TrendingUp, Banknote } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { Transaction } from '@/lib/types'

// Extended demo transactions
const demoTransactions: Transaction[] = [
  {
    id: 't1',
    userId: 'demo',
    type: 'earning',
    amount: 125.50,
    status: 'completed',
    description: 'Daily earnings from Lagos Solar Farm',
    reference: 'ERN-2024-001',
    createdAt: { toDate: () => new Date() } as never,
  },
  {
    id: 't2',
    userId: 'demo',
    type: 'deposit',
    amount: 50000,
    status: 'completed',
    description: 'Bank transfer deposit',
    reference: 'DEP-2024-001',
    createdAt: { toDate: () => new Date(Date.now() - 86400000) } as never,
  },
  {
    id: 't3',
    userId: 'demo',
    type: 'investment',
    amount: 25000,
    status: 'completed',
    description: 'Investment in Lagos Solar Farm - 50 units',
    reference: 'INV-2024-001',
    projectId: 'p1',
    createdAt: { toDate: () => new Date(Date.now() - 86400000 * 2) } as never,
  },
  {
    id: 't4',
    userId: 'demo',
    type: 'withdrawal',
    amount: 5000,
    status: 'completed',
    description: 'Withdrawal to GTBank ****6789',
    reference: 'WDR-2024-001',
    createdAt: { toDate: () => new Date(Date.now() - 86400000 * 3) } as never,
  },
  {
    id: 't5',
    userId: 'demo',
    type: 'earning',
    amount: 89.25,
    status: 'completed',
    description: 'Daily earnings from Abuja Commercial',
    reference: 'ERN-2024-002',
    createdAt: { toDate: () => new Date(Date.now() - 86400000 * 4) } as never,
  },
  {
    id: 't6',
    userId: 'demo',
    type: 'investment',
    amount: 22500,
    status: 'completed',
    description: 'Investment in Abuja Commercial - 30 units',
    reference: 'INV-2024-002',
    projectId: 'p2',
    createdAt: { toDate: () => new Date(Date.now() - 86400000 * 5) } as never,
  },
  {
    id: 't7',
    userId: 'demo',
    type: 'deposit',
    amount: 75000,
    status: 'completed',
    description: 'Card payment deposit',
    reference: 'DEP-2024-002',
    createdAt: { toDate: () => new Date(Date.now() - 86400000 * 6) } as never,
  },
  {
    id: 't8',
    userId: 'demo',
    type: 'earning',
    amount: 156.75,
    status: 'completed',
    description: 'Daily earnings from Port Harcourt Industrial',
    reference: 'ERN-2024-003',
    createdAt: { toDate: () => new Date(Date.now() - 86400000 * 7) } as never,
  },
  {
    id: 't9',
    userId: 'demo',
    type: 'withdrawal',
    amount: 10000,
    status: 'pending',
    description: 'Withdrawal to Access Bank ****1234',
    reference: 'WDR-2024-002',
    createdAt: { toDate: () => new Date(Date.now() - 86400000 * 8) } as never,
  },
  {
    id: 't10',
    userId: 'demo',
    type: 'investment',
    amount: 15000,
    status: 'completed',
    description: 'Investment in Port Harcourt Industrial - 15 units',
    reference: 'INV-2024-003',
    projectId: 'p3',
    createdAt: { toDate: () => new Date(Date.now() - 86400000 * 9) } as never,
  },
]

export default function TransactionsPage() {
  const [transactions] = useState(demoTransactions)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.reference?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getIcon = (type: Transaction['type']) => {
    switch (type) {
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

  const getIconStyles = (type: Transaction['type']) => {
    switch (type) {
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

  const formatDate = (timestamp: { toDate: () => Date }) => {
    return timestamp.toDate().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground">
            View and manage all your transactions
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by description or reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
              <SelectItem value="investment">Investments</SelectItem>
              <SelectItem value="earning">Earnings</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            {filteredTransactions.length} transactions found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full",
                          getIconStyles(transaction.type)
                        )}>
                          {getIcon(transaction.type)}
                        </div>
                        <span className="capitalize">{transaction.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {transaction.description}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {transaction.reference || '-'}
                    </TableCell>
                    <TableCell>
                      <span className={cn(
                        "font-semibold",
                        transaction.type === 'deposit' || transaction.type === 'earning'
                          ? 'text-chart-1'
                          : 'text-foreground'
                      )}>
                        {transaction.type === 'deposit' || transaction.type === 'earning' ? '+' : '-'}
                        ${transaction.amount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === 'completed' ? 'default' :
                          transaction.status === 'pending' ? 'secondary' : 'destructive'
                        }
                        className={cn(
                          transaction.status === 'completed' && 'bg-chart-1 hover:bg-chart-1/90'
                        )}
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(transaction.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
