"use client"

import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/lib/auth-context'
import { PortfolioChart } from '@/components/dashboard/portfolio-chart'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { InvestmentCard, InvestmentListItem } from '@/components/dashboard/investment-card'
import { RecentTransactions } from '@/components/dashboard/recent-transactions'
import type { Investment, PortfolioStats, Transaction } from '@/lib/types'
import Link from 'next/link'

// Demo data for display
const demoStats: PortfolioStats = {
  totalInvested: 58895,
  currentValue: 67234,
  totalEarnings: 8339,
  profitPercentage: 14.2,
  activeInvestments: 3,
}

const demoInvestments: Investment[] = [
  {
    id: '1',
    userId: 'demo',
    projectId: 'p1',
    projectName: 'Lagos Solar Farm',
    unitsBought: 50,
    totalAmount: 25000,
    purchasePrice: 500,
    currentValue: 28750,
    totalEarnings: 3750,
    status: 'active',
    createdAt: { toDate: () => new Date() } as never,
    updatedAt: { toDate: () => new Date() } as never,
  },
  {
    id: '2',
    userId: 'demo',
    projectId: 'p2',
    projectName: 'Abuja Commercial',
    unitsBought: 30,
    totalAmount: 22500,
    purchasePrice: 750,
    currentValue: 25350,
    totalEarnings: 2850,
    status: 'active',
    createdAt: { toDate: () => new Date() } as never,
    updatedAt: { toDate: () => new Date() } as never,
  },
  {
    id: '3',
    userId: 'demo',
    projectId: 'p3',
    projectName: 'Port Harcourt Industrial',
    unitsBought: 15,
    totalAmount: 15000,
    purchasePrice: 1000,
    currentValue: 16200,
    totalEarnings: 1200,
    status: 'active',
    createdAt: { toDate: () => new Date() } as never,
    updatedAt: { toDate: () => new Date() } as never,
  },
]

const demoTransactions: Transaction[] = [
  {
    id: 't1',
    userId: 'demo',
    type: 'earning',
    amount: 125.50,
    status: 'completed',
    description: 'Daily earnings from Lagos Solar Farm',
    createdAt: { toDate: () => new Date() } as never,
  },
  {
    id: 't2',
    userId: 'demo',
    type: 'investment',
    amount: 5000,
    status: 'completed',
    description: 'Investment in Abuja Commercial',
    createdAt: { toDate: () => new Date(Date.now() - 86400000) } as never,
  },
  {
    id: 't3',
    userId: 'demo',
    type: 'earning',
    amount: 89.25,
    status: 'completed',
    description: 'Daily earnings from Abuja Commercial',
    createdAt: { toDate: () => new Date(Date.now() - 86400000 * 2) } as never,
  },
  {
    id: 't4',
    userId: 'demo',
    type: 'deposit',
    amount: 10000,
    status: 'completed',
    description: 'Wallet deposit',
    createdAt: { toDate: () => new Date(Date.now() - 86400000 * 3) } as never,
  },
]

export default function DashboardPage() {
  const { userData } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<PortfolioStats>(demoStats)
  const [investments, setInvestments] = useState<Investment[]>(demoInvestments)
  const [transactions, setTransactions] = useState<Transaction[]>(demoTransactions)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Hello & welcome, {userData?.displayName?.split(' ')[0] || 'Investor'}!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your investment portfolio
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/investments">
            <Plus className="mr-2 h-4 w-4" />
            New Investment
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Portfolio Chart */}
        <PortfolioChart className="lg:col-span-2" />

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/transactions">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <RecentTransactions transactions={transactions.slice(0, 5)} />
          </CardContent>
        </Card>
      </div>

      {/* Investment Portfolio */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Investments</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/investments">See all</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {investments.map((investment, index) => (
            <InvestmentCard 
              key={investment.id} 
              investment={investment}
              variant={index === 0 ? 'highlight' : index === 1 ? 'purple' : 'default'}
            />
          ))}
        </div>
      </div>

      {/* Top Trending */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Trending Projects</CardTitle>
          <span className="text-sm text-muted-foreground">Today</span>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {investments.map((investment) => (
              <InvestmentListItem key={investment.id} investment={investment} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-2 h-4 w-48" />
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-[400px] lg:col-span-2" />
        <Skeleton className="h-[400px]" />
      </div>
    </div>
  )
}
