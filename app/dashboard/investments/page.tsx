"use client"

import { useState } from 'react'
import { Search, Filter, MapPin, Zap, TrendingUp, Users } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import type { Project } from '@/lib/types'
import { Timestamp } from 'firebase/firestore'

// Demo projects data
const demoProjects: Project[] = [
  {
    id: 'p1',
    name: 'Lagos Solar Farm Phase 1',
    description: 'A 500kW solar installation in Lekki providing clean energy to over 200 households. This project generates consistent returns through power sales to the local grid.',
    imageURL: '/projects/solar-farm-1.jpg',
    totalCapacityKW: 500,
    pricePerUnit: 50000,
    totalUnits: 10000,
    unitsSold: 7500,
    expectedROI: 15,
    status: 'active',
    location: 'Lekki, Lagos',
    startDate: Timestamp.fromDate(new Date('2024-01-15')),
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  },
  {
    id: 'p2',
    name: 'Abuja Commercial Solar',
    description: 'Commercial rooftop solar installation serving major business districts. High-yield investment with corporate power purchase agreements.',
    imageURL: '/projects/solar-farm-2.jpg',
    totalCapacityKW: 750,
    pricePerUnit: 75000,
    totalUnits: 15000,
    unitsSold: 5000,
    expectedROI: 18,
    status: 'active',
    location: 'Wuse, Abuja',
    startDate: Timestamp.fromDate(new Date('2024-03-01')),
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  },
  {
    id: 'p3',
    name: 'Port Harcourt Industrial Solar',
    description: 'Large-scale industrial solar project powering manufacturing facilities. Premium returns with long-term industrial contracts.',
    imageURL: '/projects/solar-farm-3.jpg',
    totalCapacityKW: 1000,
    pricePerUnit: 100000,
    totalUnits: 20000,
    unitsSold: 2000,
    expectedROI: 20,
    status: 'active',
    location: 'Trans Amadi, Port Harcourt',
    startDate: Timestamp.fromDate(new Date('2024-06-01')),
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  },
  {
    id: 'p4',
    name: 'Ibadan Residential Solar',
    description: 'Community solar project providing affordable clean energy to residential areas. Stable returns with government subsidies.',
    imageURL: '/projects/solar-farm-4.jpg',
    totalCapacityKW: 300,
    pricePerUnit: 30000,
    totalUnits: 6000,
    unitsSold: 4500,
    expectedROI: 12,
    status: 'active',
    location: 'Bodija, Ibadan',
    startDate: Timestamp.fromDate(new Date('2024-02-01')),
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  },
]

export default function InvestmentsPage() {
  const [projects] = useState<Project[]>(demoProjects)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [investModalOpen, setInvestModalOpen] = useState(false)
  const [investUnits, setInvestUnits] = useState(1)
  const [investing, setInvesting] = useState(false)

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleInvest = (project: Project) => {
    setSelectedProject(project)
    setInvestUnits(1)
    setInvestModalOpen(true)
  }

  const handleConfirmInvest = async () => {
    if (!selectedProject) return
    
    setInvesting(true)
    
    // Simulate investment process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.success(`Successfully invested in ${selectedProject.name}!`)
    setInvestModalOpen(false)
    setInvesting(false)
  }

  const calculateTotalCost = () => {
    if (!selectedProject) return 0
    return investUnits * selectedProject.pricePerUnit
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Investment Opportunities</h1>
        <p className="text-muted-foreground">
          Explore solar energy projects and grow your wealth
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onInvest={() => handleInvest(project)}
          />
        ))}
      </div>

      {/* Investment Modal */}
      <Dialog open={investModalOpen} onOpenChange={setInvestModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invest in {selectedProject?.name}</DialogTitle>
            <DialogDescription>
              Purchase units in this solar energy project
            </DialogDescription>
          </DialogHeader>
          
          {selectedProject && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Price per unit</p>
                  <p className="font-semibold">
                    ${selectedProject.pricePerUnit.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Expected ROI</p>
                  <p className="font-semibold text-chart-1">
                    {selectedProject.expectedROI}% annually
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Available units</p>
                  <p className="font-semibold">
                    {(selectedProject.totalUnits - selectedProject.unitsSold).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-semibold">{selectedProject.location}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="units">Number of units</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setInvestUnits(Math.max(1, investUnits - 1))}
                  >
                    -
                  </Button>
                  <Input
                    id="units"
                    type="number"
                    min={1}
                    max={selectedProject.totalUnits - selectedProject.unitsSold}
                    value={investUnits}
                    onChange={(e) => setInvestUnits(Math.max(1, parseInt(e.target.value) || 1))}
                    className="text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setInvestUnits(investUnits + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Investment</span>
                  <span className="text-2xl font-bold">
                    ${calculateTotalCost().toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Expected annual return: ${((calculateTotalCost() * selectedProject.expectedROI) / 100).toLocaleString()}
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setInvestModalOpen(false)}
              disabled={investing}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmInvest} disabled={investing}>
              {investing ? 'Processing...' : 'Confirm Investment'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ProjectCard({
  project,
  onInvest,
}: {
  project: Project
  onInvest: () => void
}) {
  const fundedPercentage = Math.round((project.unitsSold / project.totalUnits) * 100)
  const availableUnits = project.totalUnits - project.unitsSold

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      {/* Project Image */}
      <div className="relative h-40 bg-gradient-to-br from-chart-1/20 to-chart-2/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap className="h-12 w-12 text-chart-1/50" />
        </div>
        <Badge
          className={cn(
            "absolute right-3 top-3",
            project.status === 'active' ? "bg-chart-1" : "bg-muted"
          )}
        >
          {project.status === 'active' ? 'Active' : project.status}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1">{project.name}</CardTitle>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {project.location}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              ROI
            </div>
            <p className="font-semibold text-chart-1">{project.expectedROI}%</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Zap className="h-3 w-3" />
              Capacity
            </div>
            <p className="font-semibold">{project.totalCapacityKW}kW</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              Investors
            </div>
            <p className="font-semibold">{Math.floor(project.unitsSold / 10)}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Funded</span>
            <span className="font-medium">{fundedPercentage}%</span>
          </div>
          <Progress value={fundedPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {availableUnits.toLocaleString()} units available
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1">
          Details
        </Button>
        <Button className="flex-1" onClick={onInvest}>
          Invest Now
        </Button>
      </CardFooter>
    </Card>
  )
}
