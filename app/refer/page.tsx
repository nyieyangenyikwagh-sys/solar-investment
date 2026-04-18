"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Users, Gift, Wallet, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    icon: Users,
    title: "Share Your Link",
    description: "Get your unique referral link from your dashboard and share it with friends and family.",
  },
  {
    icon: CheckCircle,
    title: "Friend Signs Up",
    description: "When your friend creates an account using your link and makes their first investment.",
  },
  {
    icon: Wallet,
    title: "Earn Rewards",
    description: "You both receive a 5% bonus on their first investment amount, credited to your wallets.",
  },
]

const benefits = [
  "5% bonus on every successful referral",
  "No limit on number of referrals",
  "Instant credit to your wallet",
  "Track all referrals in your dashboard",
  "Additional bonuses for top referrers",
  "Exclusive access to premium projects",
]

const tiers = [
  {
    name: "Bronze",
    referrals: "1-5",
    bonus: "5%",
    perks: ["Standard referral bonus", "Email support"],
  },
  {
    name: "Silver",
    referrals: "6-15",
    bonus: "6%",
    perks: ["Increased referral bonus", "Priority support", "Early access to new projects"],
  },
  {
    name: "Gold",
    referrals: "16-50",
    bonus: "7%",
    perks: ["Premium referral bonus", "Dedicated account manager", "Exclusive investment opportunities"],
  },
  {
    name: "Platinum",
    referrals: "50+",
    bonus: "8%",
    perks: ["Maximum referral bonus", "VIP events access", "Custom investment packages"],
  },
]

export default function ReferPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center mb-16">
          <Badge className="mb-4 bg-accent/20 text-foreground border-0">
            <Gift className="h-4 w-4 mr-1" />
            Referral Program
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
            Earn While You Share
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Invite your friends and family to invest with Opera. 
            When they succeed, you both earn rewards.
          </p>
          <Button asChild size="lg">
            <Link href="/auth/register">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>

        {/* How It Works */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                )}
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Why Join Our Referral Program?
                  </h2>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary-foreground/80 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-primary-foreground/10 rounded-2xl p-8 text-center">
                  <p className="text-sm text-primary-foreground/70 mb-2">Average Monthly Earnings</p>
                  <p className="text-5xl font-bold mb-2">NGN 250,000+</p>
                  <p className="text-sm text-primary-foreground/70">For active referrers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Referral Tiers */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Referral Tiers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, index) => (
              <Card key={index} className={index === 3 ? "border-2 border-accent" : ""}>
                {index === 3 && (
                  <div className="bg-accent text-accent-foreground text-xs font-medium text-center py-1">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{tier.referrals} referrals</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-4xl font-bold text-foreground mb-4">{tier.bonus}</p>
                  <p className="text-sm text-muted-foreground mb-4">bonus per referral</p>
                  <ul className="text-sm space-y-2">
                    {tier.perks.map((perk, perkIndex) => (
                      <li key={perkIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                        <span className="text-muted-foreground">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Card className="bg-muted/30 text-center">
            <CardContent className="py-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Ready to Start Earning?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Create your account today and get your unique referral link. 
                The more you share, the more you earn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/auth/register">Create Account</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
