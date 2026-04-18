"use client"

import { TrendingUp, TrendingDown, Wallet, PiggyBank, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatsCardsProps {
  stats: {
    totalInvested: number
    currentValue: number
    totalEarnings: number
    profitPercentage: number
    activeInvestments: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const isProfit = stats.profitPercentage >= 0

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Invested"
        value={`$${stats.totalInvested.toLocaleString()}`}
        icon={PiggyBank}
        trend={null}
      />
      <StatCard
        title="Current Value"
        value={`$${stats.currentValue.toLocaleString()}`}
        icon={Wallet}
        trend={isProfit ? `+${stats.profitPercentage.toFixed(1)}%` : `${stats.profitPercentage.toFixed(1)}%`}
        trendPositive={isProfit}
      />
      <StatCard
        title="Total Earnings"
        value={`$${stats.totalEarnings.toLocaleString()}`}
        icon={isProfit ? TrendingUp : TrendingDown}
        trend="+12.5% this month"
        trendPositive
      />
      <StatCard
        title="Active Investments"
        value={stats.activeInvestments.toString()}
        icon={ArrowUpRight}
        trend="2 new this week"
        trendPositive
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: typeof TrendingUp
  trend: string | null
  trendPositive?: boolean
}

function StatCard({ title, value, icon: Icon, trend, trendPositive = true }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-1 text-2xl font-bold">{value}</p>
            {trend && (
              <div className={cn(
                "mt-2 flex items-center gap-1 text-sm",
                trendPositive ? "text-chart-1" : "text-destructive"
              )}>
                {trendPositive ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span>{trend}</span>
              </div>
            )}
          </div>
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            trendPositive ? "bg-chart-1/10" : "bg-destructive/10"
          )}>
            <Icon className={cn(
              "h-6 w-6",
              trendPositive ? "text-chart-1" : "text-destructive"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
