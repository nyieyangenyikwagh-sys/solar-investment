"use client"

import { useState } from 'react'
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

// Demo projects
const demoProjects = [
  {
    id: 'p1',
    name: 'Lagos Solar Farm Phase 1',
    location: 'Lekki, Lagos',
    capacity: 500,
    pricePerUnit: 50000,
    totalUnits: 10000,
    unitsSold: 7500,
    expectedROI: 15,
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: 'p2',
    name: 'Abuja Commercial Solar',
    location: 'Wuse, Abuja',
    capacity: 750,
    pricePerUnit: 75000,
    totalUnits: 15000,
    unitsSold: 5000,
    expectedROI: 18,
    status: 'active',
    createdAt: '2024-03-01',
  },
  {
    id: 'p3',
    name: 'Port Harcourt Industrial',
    location: 'Trans Amadi, PH',
    capacity: 1000,
    pricePerUnit: 100000,
    totalUnits: 20000,
    unitsSold: 2000,
    expectedROI: 20,
    status: 'active',
    createdAt: '2024-06-01',
  },
  {
    id: 'p4',
    name: 'Ibadan Residential Solar',
    location: 'Bodija, Ibadan',
    capacity: 300,
    pricePerUnit: 30000,
    totalUnits: 6000,
    unitsSold: 4500,
    expectedROI: 12,
    status: 'funded',
    createdAt: '2024-02-01',
  },
]

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState(demoProjects)
  const [searchQuery, setSearchQuery] = useState('')
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    location: '',
    capacity: '',
    pricePerUnit: '',
    totalUnits: '',
    expectedROI: '',
    status: 'active',
  })

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateProject = () => {
    if (!newProject.name || !newProject.location || !newProject.capacity) {
      toast.error('Please fill in all required fields')
      return
    }

    const project = {
      id: `p${projects.length + 1}`,
      name: newProject.name,
      location: newProject.location,
      capacity: parseInt(newProject.capacity),
      pricePerUnit: parseInt(newProject.pricePerUnit),
      totalUnits: parseInt(newProject.totalUnits),
      unitsSold: 0,
      expectedROI: parseInt(newProject.expectedROI),
      status: newProject.status,
      createdAt: new Date().toISOString().split('T')[0],
    }

    setProjects([project, ...projects])
    setCreateModalOpen(false)
    setNewProject({
      name: '',
      description: '',
      location: '',
      capacity: '',
      pricePerUnit: '',
      totalUnits: '',
      expectedROI: '',
      status: 'active',
    })
    toast.success('Project created successfully!')
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id))
    toast.success('Project deleted successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage solar energy investment projects
          </p>
        </div>
        <Button className="gap-2" onClick={() => setCreateModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Create Project
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>{filteredProjects.length} projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Price/Unit</TableHead>
                  <TableHead>Funding</TableHead>
                  <TableHead>ROI</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => {
                  const fundedPercentage = Math.round((project.unitsSold / project.totalUnits) * 100)
                  
                  return (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{project.name}</p>
                          <p className="text-sm text-muted-foreground">{project.location}</p>
                        </div>
                      </TableCell>
                      <TableCell>{project.capacity}kW</TableCell>
                      <TableCell>${project.pricePerUnit.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="w-32 space-y-1">
                          <Progress value={fundedPercentage} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {fundedPercentage}% ({project.unitsSold.toLocaleString()} / {project.totalUnits.toLocaleString()})
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-chart-1 font-medium">{project.expectedROI}%</span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            project.status === 'active' && 'bg-chart-1 hover:bg-chart-1/90',
                            project.status === 'funded' && 'bg-chart-2 hover:bg-chart-2/90',
                            project.status === 'completed' && 'bg-primary hover:bg-primary/90'
                          )}
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Eye className="h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="gap-2 text-destructive"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Project Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Add a new solar energy investment project
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                placeholder="Lagos Solar Farm Phase 2"
                value={newProject.name}
                onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Project description..."
                value={newProject.description}
                onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="Lekki, Lagos"
                  value={newProject.location}
                  onChange={(e) => setNewProject(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity (kW) *</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="500"
                  value={newProject.capacity}
                  onChange={(e) => setNewProject(prev => ({ ...prev, capacity: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pricePerUnit">Price per Unit ($)</Label>
                <Input
                  id="pricePerUnit"
                  type="number"
                  placeholder="50000"
                  value={newProject.pricePerUnit}
                  onChange={(e) => setNewProject(prev => ({ ...prev, pricePerUnit: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalUnits">Total Units</Label>
                <Input
                  id="totalUnits"
                  type="number"
                  placeholder="10000"
                  value={newProject.totalUnits}
                  onChange={(e) => setNewProject(prev => ({ ...prev, totalUnits: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expectedROI">Expected ROI (%)</Label>
                <Input
                  id="expectedROI"
                  type="number"
                  placeholder="15"
                  value={newProject.expectedROI}
                  onChange={(e) => setNewProject(prev => ({ ...prev, expectedROI: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newProject.status} 
                  onValueChange={(value) => setNewProject(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="funded">Funded</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProject}>
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
