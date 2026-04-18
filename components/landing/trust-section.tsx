"use client"

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Monitor, Smartphone } from 'lucide-react'

const investors = [
  { name: 'Seweryna Zawadzka', amount: '$98,000.00', initials: 'SZ' },
  { name: 'Haleema Sirin Antoun', amount: '$68,899.00', initials: 'HS' },
  { name: 'Adrian H. Bruddy', amount: '$50,000.00', initials: 'AB' },
  { name: 'Mahoko Kurata', amount: '$49,235.00', initials: 'MK' },
  { name: 'Naruha Shiroi', amount: '$35,500.00', initials: 'NS' },
  { name: 'Patrick Frederiksen', amount: '$29,000.00', initials: 'PF' },
  { name: 'Jan Michalik', amount: '$98,896.00', initials: 'JM' },
  { name: 'Pedro J. Trahan', amount: '$37,900.00', initials: 'PT' },
  { name: 'Slawomira Kozlowska', amount: '$6,899.00', initials: 'SK' },
  { name: 'Benjamin Moore', amount: '$1,220.00', initials: 'BM' },
  { name: 'Anna Stehlikova', amount: '$4,789.00', initials: 'AS' },
  { name: 'Walentyna Wisniewska', amount: '$32,100.00', initials: 'WW' },
  { name: 'Nadzieja Jasinska', amount: '$44,000.00', initials: 'NJ' },
  { name: 'Nicolai Jorgensen', amount: '$2,756.00', initials: 'NJ' },
  { name: 'Rose Komarova', amount: '$346,000.00', initials: 'RK' },
  { name: 'Valeria Solomina', amount: '$23,650.00', initials: 'VS' },
  { name: 'Matthew S. Lloyd', amount: '$20,000.00', initials: 'ML' },
  { name: 'Brandon Hall', amount: '$17,250.00', initials: 'BH' },
  { name: 'Sophia Lang', amount: '$12,896.00', initials: 'SL' },
]

export function TrustSection() {
  return (
    <section className="overflow-hidden px-4 py-16 md:py-24">
      <div className="container mx-auto text-center">
        <h2 className="mx-auto max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          Ask over 5 million
          <br />
          people who have trusted us for decades
        </h2>

        {/* Scrolling Investors Grid */}
        <div className="relative mt-12">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          
          {/* Investor Rows */}
          <div className="space-y-4">
            {/* Row 1 - Scroll Right */}
            <div className="flex animate-scroll-right gap-4">
              {[...investors.slice(0, 10), ...investors.slice(0, 10)].map((investor, i) => (
                <InvestorCard key={`r1-${i}`} {...investor} />
              ))}
            </div>
            
            {/* Row 2 - Scroll Left */}
            <div className="flex animate-scroll-left gap-4">
              {[...investors.slice(10), ...investors.slice(10)].map((investor, i) => (
                <InvestorCard key={`r2-${i}`} {...investor} />
              ))}
            </div>
            
            {/* Row 3 - Scroll Right Slower */}
            <div className="flex animate-scroll-right-slow gap-4">
              {[...investors.slice(5, 15), ...investors.slice(5, 15)].map((investor, i) => (
                <InvestorCard key={`r3-${i}`} {...investor} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <Link href="/dashboard">
              <Monitor className="h-4 w-4" />
              Open Dashboard
            </Link>
          </Button>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/auth/register">
              <Smartphone className="h-4 w-4" />
              Get Opera V1.0 Mobile
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function InvestorCard({ 
  name, 
  amount, 
  initials 
}: { 
  name: string
  amount: string
  initials: string 
}) {
  return (
    <div className="flex flex-shrink-0 items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-accent text-xs">{initials}</AvatarFallback>
      </Avatar>
      <div className="text-left">
        <p className="text-sm font-medium whitespace-nowrap">{name}</p>
        <p className="text-xs text-muted-foreground">{amount}</p>
      </div>
    </div>
  )
}
