"use client"

import { Search, LayoutDashboard, Box, Users, TrendingUp, ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export function DashboardPreview() {
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="container mx-auto">
        {/* Dashboard Preview Card */}
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-foreground/5">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            {/* Logo & User */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4 text-primary-foreground"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                  </svg>
                </div>
                <span className="font-semibold">Opera</span>
              </div>
              
              <div className="hidden items-center gap-2 md:flex">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-accent text-xs">HS</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Haleema Sirin Antoun</p>
                  <p className="text-xs text-muted-foreground">$68,899.00</p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="hidden items-center gap-4 md:flex">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground">
                <Search className="h-4 w-4" />
                <span>Search ...</span>
              </div>
            </div>

            {/* Period Selector */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <span>Team #4</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm">Over $5k</Button>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Last 7 Days</Button>
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="hidden w-48 border-r border-border p-4 lg:block">
              <nav className="space-y-1">
                <SidebarItem icon={LayoutDashboard} label="Overview" active />
                <SidebarItem icon={Box} label="Invest boxes" />
                <SidebarItem icon={Users} label="Friends" />
                <SidebarItem icon={TrendingUp} label="Analytics" />
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {/* Welcome */}
              <h2 className="text-2xl font-semibold">Hello & welcome, Haleema!</h2>

              {/* Stats Grid */}
              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                <StatCard 
                  label="Active Investments" 
                  value="$58,895" 
                  trend="+12.5%"
                  positive
                />
                <StatCard 
                  label="New Memberships Today" 
                  value="$3,569" 
                  trend="+5.2%"
                  positive
                />
                <StatCard 
                  label="New Membership in Past 30 days" 
                  value="$12,586" 
                  trend="+18.3%"
                  positive
                />
                <StatCard 
                  label="Total Revenue Processed" 
                  value="$79,896" 
                  trend="+24.1%"
                  positive
                />
              </div>

              {/* Mini Chart Placeholder */}
              <div className="mt-8 h-32 rounded-xl border border-border bg-background/50 p-4">
                <div className="flex h-full items-end justify-between gap-1">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-chart-1/60"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SidebarItem({ 
  icon: Icon, 
  label, 
  active = false 
}: { 
  icon: typeof LayoutDashboard
  label: string
  active?: boolean 
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
        active 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </div>
  )
}

function StatCard({ 
  label, 
  value, 
  trend,
  positive = true 
}: { 
  label: string
  value: string
  trend: string
  positive?: boolean
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      <p className={`mt-1 text-xs ${positive ? 'text-chart-1' : 'text-destructive'}`}>
        {trend}
      </p>
    </div>
  )
}
