"use client"

import { useState } from 'react'
import { User, Shield, Bell, CreditCard, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { useAuth } from '@/lib/auth-context'

export default function SettingsPage() {
  const { user, userData } = useAuth()
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    displayName: userData?.displayName || '',
    email: user?.email || '',
    phone: userData?.phoneNumber || '',
  })

  const handleSaveProfile = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success('Profile updated successfully!')
    setLoading(false)
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="payment" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Payment
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                    {getInitials(profileData.displayName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                  <p className="mt-1 text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.displayName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
              <CardDescription>
                Your account verification status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    userData?.idVerificationStatus === 'verified' 
                      ? 'bg-chart-1/10 text-chart-1' 
                      : 'bg-chart-2/10 text-chart-2'
                  }`}>
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Identity Verification</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      Status: {userData?.idVerificationStatus || 'Not submitted'}
                    </p>
                  </div>
                </div>
                {userData?.idVerificationStatus !== 'verified' && (
                  <Button variant="outline" size="sm">
                    Verify Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Change Password */}
              <div className="space-y-4">
                <h3 className="font-medium">Change Password</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div />
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <Button>Update Password</Button>
              </div>

              <Separator />

              {/* Two-Factor Auth */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              {/* Active Sessions */}
              <div className="space-y-4">
                <h3 className="font-medium">Active Sessions</h3>
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Device</p>
                      <p className="text-sm text-muted-foreground">
                        Chrome on Windows - Lagos, Nigeria
                      </p>
                    </div>
                    <span className="text-xs text-chart-1">Active now</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <NotificationSetting
                title="Investment Updates"
                description="Get notified about your investment performance"
                defaultChecked
              />
              <NotificationSetting
                title="Daily Earnings"
                description="Receive daily earnings summary"
                defaultChecked
              />
              <NotificationSetting
                title="New Opportunities"
                description="Be the first to know about new projects"
                defaultChecked
              />
              <NotificationSetting
                title="Withdrawal Notifications"
                description="Get notified when withdrawals are processed"
                defaultChecked
              />
              <NotificationSetting
                title="Marketing Emails"
                description="Receive promotional offers and updates"
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Tab */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment and withdrawal methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Saved Banks */}
              <div className="space-y-4">
                <h3 className="font-medium">Saved Bank Accounts</h3>
                <div className="space-y-3">
                  <BankAccountCard
                    bankName="GTBank"
                    accountNumber="****6789"
                    accountName="John Doe"
                    isDefault
                  />
                  <BankAccountCard
                    bankName="Access Bank"
                    accountNumber="****1234"
                    accountName="John Doe"
                  />
                </div>
                <Button variant="outline" className="w-full">
                  Add Bank Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NotificationSetting({
  title,
  description,
  defaultChecked = false,
}: {
  title: string
  description: string
  defaultChecked?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  )
}

function BankAccountCard({
  bankName,
  accountNumber,
  accountName,
  isDefault = false,
}: {
  bankName: string
  accountNumber: string
  accountName: string
  isDefault?: boolean
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CreditCard className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{bankName}</p>
            {isDefault && (
              <span className="rounded-full bg-chart-1/10 px-2 py-0.5 text-xs text-chart-1">
                Default
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {accountNumber} - {accountName}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        Remove
      </Button>
    </div>
  )
}
