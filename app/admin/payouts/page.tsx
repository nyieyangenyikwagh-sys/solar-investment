"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Users,
  AlertTriangle,
} from "lucide-react"
import type { WithdrawalRequest } from "@/lib/types"
import { toast } from "sonner"

/**
 * SAFE STUB SERVICE (prevents build crash)
 * Replace later with real Firebase logic
 */
const adminService = {
  async getWithdrawalRequests(): Promise<WithdrawalRequest[]> {
    return []
  },
  async approveWithdrawal(id: string) {
    console.log("Approved:", id)
  },
  async rejectWithdrawal(id: string) {
    console.log("Rejected:", id)
  },
}

export default function AdminPayoutsPage() {
  const [requests, setRequests] = useState<WithdrawalRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] =
    useState<WithdrawalRequest | null>(null)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    try {
      const data = await adminService.getWithdrawalRequests()
      setRequests(data)
    } catch (error) {
      console.error(error)
      toast.error("Failed to load requests")
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    if (!selectedRequest) return
    setProcessing(true)

    try {
      await adminService.approveWithdrawal(selectedRequest.id)
      toast.success("Approved")
      setShowApproveDialog(false)
      loadRequests()
    } catch (error) {
      toast.error("Failed to approve")
    } finally {
      setProcessing(false)
    }
  }

  const handleReject = async () => {
    if (!selectedRequest) return
    setProcessing(true)

    try {
      await adminService.rejectWithdrawal(selectedRequest.id)
      toast.success("Rejected")
      setShowRejectDialog(false)
      loadRequests()
    } catch (error) {
      toast.error("Failed to reject")
    } finally {
      setProcessing(false)
    }
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)

  const pendingRequests = requests.filter((r) => r.status === "pending")
  const approvedRequests = requests.filter((r) => r.status === "approved")
  const rejectedRequests = requests.filter((r) => r.status === "rejected")

  const RequestsTable = ({ data }: { data: WithdrawalRequest[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-6">
              No requests
            </TableCell>
          </TableRow>
        ) : (
          data.map((req) => (
            <TableRow key={req.id}>
              <TableCell>{req.userId}</TableCell>
              <TableCell>{formatCurrency(req.amount)}</TableCell>
              <TableCell>{req.status}</TableCell>

              <TableCell>
                {req.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedRequest(req)
                        setShowApproveDialog(true)
                      }}
                    >
                      Approve
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setSelectedRequest(req)
                        setShowRejectDialog(true)
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payouts</h1>
        <p className="text-muted-foreground">
          Manage withdrawal requests
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Requests</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Tabs defaultValue="pending">
              <TabsList>
                <TabsTrigger value="pending">
                  Pending ({pendingRequests.length})
                </TabsTrigger>
                <TabsTrigger value="approved">
                  Approved ({approvedRequests.length})
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  Rejected ({rejectedRequests.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending">
                <RequestsTable data={pendingRequests} />
              </TabsContent>

              <TabsContent value="approved">
                <RequestsTable data={approvedRequests} />
              </TabsContent>

              <TabsContent value="rejected">
                <RequestsTable data={rejectedRequests} />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>

      {/* APPROVE DIALOG */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve</DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={() => setShowApproveDialog(false)}>
              Cancel
            </Button>

            <Button onClick={handleApprove} disabled={processing}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* REJECT DIALOG */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject</DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={processing}
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}