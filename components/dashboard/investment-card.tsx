"use client"

import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Investment } from '@/lib/types'

interface InvestmentCardProps {
  investment: Investment
  variant?: 'default' | 'highlight' | 'purple'
}

export function InvestmentCard({ investment, variant = 'default' }: InvestmentCardProps) {
  const profitAmount = investment.currentValue - investment.totalAmount
  const profitPercentage = ((profitAmount / investment.totalAmount) * 100).toFixed(1)
  const isProfit = profitAmount >= 0

  const cardStyles = {
    default: 'bg-card border-border',
    highlight: 'bg-chart-1/10 border-chart-1/20',
    purple: 'bg-chart-3/10 border-chart-3/20',
  }

  return (
    <Card className={cn("overflow-hidden transition-shadow hover:shadow-lg", cardStyles[variant])}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold",
              variant === 'highlight' ? "bg-chart-1 text-white" : 
              variant === 'purple' ? "bg-chart-3 text-white" : 
              "bg-primary text-primary-foreground"
            )}>
              {investment.projectName.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold">{investment.projectName}</h3>
              <p className="text-sm text-muted-foreground">
                {investment.unitsBought} units
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold">
              ${investment.currentValue.toLocaleString()}
            </span>
            <div className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              isProfit ? "bg-chart-1/10 text-chart-1" : "bg-destructive/10 text-destructive"
            )}>
              {isProfit ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {isProfit ? '+' : ''}{profitPercentage}%
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Invested: ${investment.totalAmount.toLocaleString()}
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <Button 
            variant={variant === 'default' ? 'default' : 'secondary'} 
            size="sm" 
            className="flex-1"
          >
            Buy
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
          >
            Sell
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Mini investment card for lists
export function InvestmentListItem({ investment }: { investment: Investment }) {
  const profitPercentage = (((investment.currentValue - investment.totalAmount) / investment.totalAmount) * 100).toFixed(1)
  const isProfit = investment.currentValue >= investment.totalAmount

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg font-bold text-primary">
          {investment.projectName.charAt(0)}
        </div>
        <div>
          <h4 className="font-medium">{investment.projectName}</h4>
          <p className="text-sm text-muted-foreground">{investment.unitsBought} units</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">${investment.currentValue.toLocaleString()}</p>
        <p className={cn(
          "text-sm",
          isProfit ? "text-chart-1" : "text-destructive"
        )}>
          {isProfit ? '+' : ''}{profitPercentage}%
        </p>
      </div>
    </div>
  )
}
