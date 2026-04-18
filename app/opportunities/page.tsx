"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Sun, MapPin, TrendingUp, Users, Clock } from "lucide-react"
import { projectService } from "@/lib/firebase-services"
import type { Project } from "@/lib/types"

export default function OpportunitiesPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const data = await projectService.getActiveProjects()
      setProjects(data)
    } catch (error) {
      console.error("Error loading projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Demo projects for display
  const demoProjects: Project[] = [
    {
      id: "1",
      name: "Lagos Solar Farm Phase 1",
      description: "50MW solar installation in Lagos industrial district powering over 10,000 homes and businesses.",
      location: "Lagos, Nigeria",
      totalUnits: 5000,
      availableUnits: 2500,
      unitPrice: 10000,
      expectedReturn: 18,
      duration: 24,
      status: "active",
      imageUrl: "/projects/solar-farm-1.jpg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Abuja Green Energy Hub",
      description: "25MW hybrid solar and storage facility serving the Federal Capital Territory.",
      location: "Abuja, Nigeria",
      totalUnits: 2500,
      availableUnits: 800,
      unitPrice: 10000,
      expectedReturn: 20,
      duration: 18,
      status: "active",
      imageUrl: "/projects/solar-farm-2.jpg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Port Harcourt Industrial Solar",
      description: "35MW installation powering industrial facilities in Rivers State.",
      location: "Port Harcourt, Nigeria",
      totalUnits: 3500,
      availableUnits: 3500,
      unitPrice: 10000,
      expectedReturn: 22,
      duration: 36,
      status: "active",
      imageUrl: "/projects/solar-farm-3.jpg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Kano Solar Initiative",
      description: "20MW community solar project bringing clean energy to Northern Nigeria.",
      location: "Kano, Nigeria",
      totalUnits: 2000,
      availableUnits: 1200,
      unitPrice: 10000,
      expectedReturn: 16,
      duration: 24,
      status: "active",
      imageUrl: "/projects/solar-farm-4.jpg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  const displayProjects = projects.length > 0 ? projects : demoProjects

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center mb-16">
          <Badge className="mb-4 bg-accent/20 text-foreground border-0">
            Investment Opportunities
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
            Invest in Solar Energy Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Browse our curated selection of solar energy projects across Nigeria. 
            Each project is vetted for quality and projected returns.
          </p>
        </section>

        {/* Stats Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-card/50">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-foreground">15+</div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-foreground">150MW</div>
                <p className="text-sm text-muted-foreground">Total Capacity</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-foreground">18%</div>
                <p className="text-sm text-muted-foreground">Avg. Returns</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-foreground">5000+</div>
                <p className="text-sm text-muted-foreground">Happy Investors</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">Available Projects</h2>
          
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProjects.map((project) => {
                const fundedPercentage = ((project.totalUnits - project.availableUnits) / project.totalUnits) * 100
                
                return (
                  <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                      <Sun className="h-16 w-16 text-accent" />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <Badge className="bg-green-100 text-green-800 shrink-0">Active</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {project.location}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Funded</span>
                          <span className="font-medium">{fundedPercentage.toFixed(0)}%</span>
                        </div>
                        <Progress value={fundedPercentage} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <div>
                            <p className="text-xs text-muted-foreground">Expected Return</p>
                            <p className="font-semibold text-green-600">{project.expectedReturn}% p.a.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Duration</p>
                            <p className="font-semibold">{project.duration} months</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">Unit Price</p>
                          <p className="font-bold">{formatCurrency(project.unitPrice)}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {project.availableUnits} units left
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/auth/login?redirect=/dashboard/investments?project=${project.id}`}>
                          Invest Now
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Investing?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Join thousands of investors earning passive income through sustainable solar energy investments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/auth/register">Create Account</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
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
