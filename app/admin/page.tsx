"use client"

import { useState, useEffect } from 'react'
import {
  Users,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Activity,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { cn } from '@/lib/utils'

// Demo platform stats
const platformStats = {
  totalUsers: 12586,
  newUsersToday: 156,
  totalInvestments: 58895000,
  activeInvestments: 45670000,
  totalRevenue: 8956000,
  pendingPayouts: 125000,
}

// Demo revenue data
const revenueData = [
  { month: 'Jan', revenue: 650000, users: 8500 },
  { month: 'Feb', revenue: 720000, users: 9200 },
  { month: 'Mar', revenue: 810000, users: 9800 },
  { month: 'Apr', revenue: 890000, users: 10400 },
  { month: 'May', revenue: 950000, users: 11200 },
  { month: 'Jun', revenue: 1050000, users: 12000 },
  { month: 'Jul', revenue: 1120000, users: 12586 },
]

// Demo project performance
const projectPerformance = [
  { name: 'Lagos Solar', invested: 25000000, returns: 3750000 },
  { name: 'Abuja Commercial', invested: 15000000, returns: 2700000 },
  { name: 'PH Industrial', invested: 12000000, returns: 2400000 },
  { name: 'Ibadan Residential', invested: 8000000, returns: 960000 },
]

// Demo recent activities
const recentActivities = [
  { id: 1, user: 'John Doe', action: 'New investment', amount: 50000, time: '2 mins ago', type: 'investment' },
  { id: 2, user: 'Jane Smith', action: 'Withdrawal request', amount: 10000, time: '5 mins ago', type: 'withdrawal' },
  { id: 3, user: 'Mike Johnson', action: 'Account verified', amount: null, time: '10 mins ago', type: 'verification' },
  { id: 4, user: 'Sarah Williams', action: 'New registration', amount: null, time: '15 mins ago', type: 'registration' },
  { id: 5, user: 'David Brown', action: 'New investment', amount: 75000, time: '20 mins ago', type: 'investment' },
]

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <AdminSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Platform overview and management
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={platformStats.totalUsers.toLocaleString()}
          change={`+${platformStats.newUsersToday} today`}
          icon={Users}
          positive
        />
        <StatCard
          title="Active Investments"
          value={`$${(platformStats.activeInvestments / 1000000).toFixed(1)}M`}
          change="+12.5% this month"
          icon={TrendingUp}
          positive
        />
        <StatCard
          title="Total Revenue"
          value={`$${(platformStats.totalRevenue / 1000000).toFixed(1)}M`}
          change="+8.2% this month"
          icon={DollarSign}
          positive
        />
        <StatCard
          title="Pending Payouts"
          value={`$${platformStats.pendingPayouts.toLocaleString()}`}
          change="12 requests"
          icon={Wallet}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly platform revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(34, 197, 94)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="rgb(34, 197, 94)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="rgb(34, 197, 94)" strokeWidth={2} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Project Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Project Performance</CardTitle>
            <CardDescription>Investment vs Returns by project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} width={100} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`]}
                  />
                  <Bar dataKey="invested" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Invested" />
                  <Bar dataKey="returns" fill="rgb(34, 197, 94)" radius={[0, 4, 4, 0]} name="Returns" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest platform activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    activity.type === 'investment' ? 'bg-chart-1/10 text-chart-1' :
                    activity.type === 'withdrawal' ? 'bg-destructive/10 text-destructive' :
                    activity.type === 'verification' ? 'bg-chart-3/10 text-chart-3' :
                    'bg-primary/10 text-primary'
                  )}>
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  {activity.amount && (
                    <p className="font-semibold">${activity.amount.toLocaleString()}</p>
                  )}
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  positive = false,
}: {
  title: string
  value: string
  change: string
  icon: typeof Users
  positive?: boolean
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-1 text-2xl font-bold">{value}</p>
            <div className={cn(
              "mt-2 flex items-center gap-1 text-sm",
              positive ? "text-chart-1" : "text-muted-foreground"
            )}>
              {positive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              <span>{change}</span>
            </div>
          </div>
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            positive ? "bg-chart-1/10" : "bg-muted"
          )}>
            <Icon className={cn(
              "h-6 w-6",
              positive ? "text-chart-1" : "text-muted-foreground"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AdminSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-2 h-4 w-32" />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
      </div>
    </div>
  )
}
