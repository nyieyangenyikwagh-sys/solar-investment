"use client"

import { useState } from 'react'
import { Wallet, ArrowDownLeft, ArrowUpRight, CreditCard, Building2, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { RecentTransactions } from '@/components/dashboard/recent-transactions'
import type { Transaction } from '@/lib/types'

// Demo wallet data
const demoWallet = {
  balance: 125000,
  lockedFunds: 58895,
  totalEarnings: 12500,
  totalWithdrawn: 5000,
}

const demoTransactions: Transaction[] = [
  {
    id: 't1',
    userId: 'demo',
    type: 'earning',
    amount: 125.50,
    status: 'completed',
    description: 'Daily earnings from Lagos Solar Farm',
    createdAt: { toDate: () => new Date() } as never,
  },
  {
    id: 't2',
    userId: 'demo',
    type: 'deposit',
    amount: 50000,
    status: 'completed',
    description: 'Bank transfer deposit',
    createdAt: { toDate: () => new Date(Date.now() - 86400000) } as never,
  },
  {
    id: 't3',
    userId: 'demo',
    type: 'withdrawal',
    amount: 5000,
    status: 'completed',
    description: 'Withdrawal to GTBank',
    createdAt: { toDate: () => new Date(Date.now() - 86400000 * 2) } as never,
  },
  {
    id: 't4',
    userId: 'demo',
    type: 'investment',
    amount: 25000,
    status: 'completed',
    description: 'Investment in Lagos Solar Farm',
    createdAt: { toDate: () => new Date(Date.now() - 86400000 * 3) } as never,
  },
  {
    id: 't5',
    userId: 'demo',
    type: 'earning',
    amount: 89.25,
    status: 'completed',
    description: 'Daily earnings from Abuja Commercial',
    createdAt: { toDate: () => new Date(Date.now() - 86400000 * 4) } as never,
  },
]

export default function WalletPage() {
  const [wallet] = useState(demoWallet)
  const [transactions] = useState(demoTransactions)
  const [depositModalOpen, setDepositModalOpen] = useState(false)
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Wallet</h1>
        <p className="text-muted-foreground">
          Manage your funds and transactions
        </p>
      </div>

      {/* Wallet Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <WalletCard
          title="Available Balance"
          value={wallet.balance}
          icon={Wallet}
          variant="primary"
        />
        <WalletCard
          title="Locked in Investments"
          value={wallet.lockedFunds}
          icon={CreditCard}
          variant="warning"
        />
        <WalletCard
          title="Total Earnings"
          value={wallet.totalEarnings}
          icon={ArrowDownLeft}
          variant="success"
        />
        <WalletCard
          title="Total Withdrawn"
          value={wallet.totalWithdrawn}
          icon={ArrowUpRight}
          variant="default"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <Button size="lg" className="gap-2" onClick={() => setDepositModalOpen(true)}>
          <ArrowDownLeft className="h-4 w-4" />
          Deposit Funds
        </Button>
        <Button size="lg" variant="outline" className="gap-2" onClick={() => setWithdrawModalOpen(true)}>
          <ArrowUpRight className="h-4 w-4" />
          Withdraw Funds
        </Button>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent wallet activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="deposits">Deposits</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <RecentTransactions transactions={transactions} />
            </TabsContent>
            <TabsContent value="deposits" className="mt-4">
              <RecentTransactions 
                transactions={transactions.filter(t => t.type === 'deposit')} 
              />
            </TabsContent>
            <TabsContent value="withdrawals" className="mt-4">
              <RecentTransactions 
                transactions={transactions.filter(t => t.type === 'withdrawal')} 
              />
            </TabsContent>
            <TabsContent value="earnings" className="mt-4">
              <RecentTransactions 
                transactions={transactions.filter(t => t.type === 'earning')} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Deposit Modal */}
      <DepositModal 
        open={depositModalOpen} 
        onClose={() => setDepositModalOpen(false)} 
      />

      {/* Withdraw Modal */}
      <WithdrawModal 
        open={withdrawModalOpen} 
        onClose={() => setWithdrawModalOpen(false)}
        balance={wallet.balance}
      />
    </div>
  )
}

function WalletCard({
  title,
  value,
  icon: Icon,
  variant = 'default',
}: {
  title: string
  value: number
  icon: typeof Wallet
  variant?: 'default' | 'primary' | 'success' | 'warning'
}) {
  const styles = {
    default: 'bg-card border-border',
    primary: 'bg-primary/5 border-primary/20',
    success: 'bg-chart-1/5 border-chart-1/20',
    warning: 'bg-chart-2/5 border-chart-2/20',
  }

  const iconStyles = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-chart-1/10 text-chart-1',
    warning: 'bg-chart-2/10 text-chart-2',
  }

  return (
    <Card className={cn("border", styles[variant])}>
      <CardContent className="flex items-center gap-4 p-6">
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", iconStyles[variant])}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">${value.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function DepositModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDeposit = async () => {
    if (!amount || !method) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    toast.success('Deposit initiated successfully!')
    setLoading(false)
    onClose()
    setAmount('')
    setMethod('')
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deposit Funds</DialogTitle>
          <DialogDescription>
            Add money to your Opera wallet
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (NGN)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="method">Payment Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Bank Transfer
                  </div>
                </SelectItem>
                <SelectItem value="card">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Debit Card
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {method === 'bank' && (
            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="font-medium">Bank Transfer Details:</p>
              <div className="mt-2 space-y-1 text-muted-foreground">
                <p>Bank: GTBank</p>
                <p>Account Name: Opera Investments Ltd</p>
                <p>Account Number: 0123456789</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleDeposit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Deposit'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function WithdrawModal({ 
  open, 
  onClose,
  balance,
}: { 
  open: boolean
  onClose: () => void
  balance: number
}) {
  const [amount, setAmount] = useState('')
  const [bankName, setBankName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleWithdraw = async () => {
    if (!amount || !bankName || !accountNumber || !accountName) {
      toast.error('Please fill in all fields')
      return
    }

    const withdrawAmount = parseFloat(amount)
    if (withdrawAmount > balance) {
      toast.error('Insufficient balance')
      return
    }

    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    toast.success('Withdrawal request submitted!')
    setLoading(false)
    onClose()
    setAmount('')
    setBankName('')
    setAccountNumber('')
    setAccountName('')
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            Transfer money to your bank account
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-muted p-3 text-sm">
            <span className="text-muted-foreground">Available balance: </span>
            <span className="font-semibold">${balance.toLocaleString()}</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">Amount (NGN)</Label>
            <Input
              id="withdraw-amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bank">Bank Name</Label>
            <Select value={bankName} onValueChange={setBankName}>
              <SelectTrigger>
                <SelectValue placeholder="Select your bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gtbank">GTBank</SelectItem>
                <SelectItem value="firstbank">First Bank</SelectItem>
                <SelectItem value="zenith">Zenith Bank</SelectItem>
                <SelectItem value="access">Access Bank</SelectItem>
                <SelectItem value="uba">UBA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-number">Account Number</Label>
            <Input
              id="account-number"
              type="text"
              placeholder="Enter account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-name">Account Name</Label>
            <Input
              id="account-name"
              type="text"
              placeholder="Enter account name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleWithdraw} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Withdraw'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
