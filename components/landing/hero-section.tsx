"use client"

import Link from 'next/link'
import { Sparkles, Monitor, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 md:py-24 lg:py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-accent/30 blur-3xl" />
      </div>
      
      <div className="container mx-auto text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
          <Sparkles className="h-4 w-4 text-accent" />
          <span>Invest with your family & friends!</span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          Self-serve & transparent{' '}
          <br className="hidden sm:block" />
          method for investing together
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
          Whether it&apos;s pooling resources with family, rallying friends, or collaborating with like-minded individuals, our platform fosters a sense of community and purpose.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/auth/register">
              <Smartphone className="h-4 w-4" />
              Get Opera For Mobile
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <Link href="/dashboard">
              <Monitor className="h-4 w-4" />
              Open Dashboard
            </Link>
          </Button>
        </div>

        {/* Floating decorative icons */}
        <div className="pointer-events-none absolute left-[10%] top-1/3 hidden lg:block">
          <div className="rounded-2xl bg-accent/80 p-4 shadow-lg">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent-foreground" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </div>
        </div>
        <div className="pointer-events-none absolute right-[10%] top-1/4 hidden lg:block">
          <div className="rounded-2xl bg-foreground p-4 shadow-lg">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-background" fill="currentColor">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 11-8 0" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
