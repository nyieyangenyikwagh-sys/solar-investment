"use client"

import { useState } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'

// Generate demo chart data
function generateChartData(range: TimeRange) {
  const points = {
    '1D': 24,
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '1Y': 12,
    'ALL': 24,
  }[range]

  const data = []
  let baseValue = 50000 + Math.random() * 10000
  
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.4) * 1000 // Slight upward bias
    baseValue = Math.max(40000, baseValue + change)
    
    let label: string
    if (range === '1D') {
      label = `${i}:00`
    } else if (range === '1W') {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      label = days[i % 7]
    } else if (range === '1Y') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      label = months[i % 12]
    } else {
      label = `${i + 1}`
    }
    
    data.push({
      label,
      value: Math.round(baseValue),
      earnings: Math.round(Math.random() * 500 + 100),
    })
  }
  
  return data
}

interface PortfolioChartProps {
  className?: string
}

export function PortfolioChart({ className }: PortfolioChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M')
  const [chartData, setChartData] = useState(() => generateChartData('1M'))

  const handleRangeChange = (range: TimeRange) => {
    setTimeRange(range)
    setChartData(generateChartData(range))
  }

  const currentValue = chartData[chartData.length - 1]?.value || 0
  const startValue = chartData[0]?.value || 0
  const change = currentValue - startValue
  const changePercent = startValue > 0 ? ((change / startValue) * 100).toFixed(2) : '0.00'
  const isPositive = change >= 0

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-2xl font-bold">
            ${currentValue.toLocaleString()}
          </CardTitle>
          <p className={cn(
            "text-sm font-medium",
            isPositive ? "text-chart-1" : "text-destructive"
          )}>
            {isPositive ? '+' : ''}{change.toLocaleString()} ({isPositive ? '+' : ''}{changePercent}%)
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
          {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as TimeRange[]).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'ghost'}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => handleRangeChange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} 
                    stopOpacity={0.3}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} 
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                dx={-10}
                domain={['dataMin - 2000', 'dataMax + 2000']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                strokeWidth={2}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
