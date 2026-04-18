"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

export default function AdminSettingsPage() {
  const [platformSettings, setPlatformSettings] = useState({
    unitPrice: 10000,
    minInvestment: 1,
    maxInvestment: 100,
    dailyReturnRate: 0.5,
    referralBonus: 5,
    withdrawalMinimum: 5000,
    maintenanceMode: false,
    newRegistrations: true,
    autoPayouts: false,
  })

  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      // In production, this would save to Firebase
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Settings saved successfully")
    } catch (error) {
      console.error("Error saving settings:", error)
      toast.error("Failed to save settings")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Platform Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure platform-wide settings and parameters
        </p>
      </div>

      <Tabs defaultValue="investment">
        <TabsList>
          <TabsTrigger value="investment">Investment</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="investment" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Parameters</CardTitle>
              <CardDescription>
                Configure investment unit pricing and limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="unitPrice">Unit Price (NGN)</Label>
                  <Input
                    id="unitPrice"
                    type="number"
                    value={platformSettings.unitPrice}
                    onChange={(e) => setPlatformSettings(prev => ({
                      ...prev,
                      unitPrice: Number(e.target.value)
                    }))}
                  />
                  <p className="text-sm text-muted-foreground">
                    Price per investment unit
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dailyReturn">Daily Return Rate (%)</Label>
                  <Input
                    id="dailyReturn"
                    type="number"
                    step="0.01"
                    value={platformSettings.dailyReturnRate}
                    onChange={(e) => setPlatformSettings(prev => ({
                      ...prev,
                      dailyReturnRate: Number(e.target.value)
                    }))}
                  />
                  <p className="text-sm text-muted-foreground">
                    Daily return percentage for investors
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minInvestment">Minimum Units</Label>
                  <Input
                    id="minInvestment"
                    type="number"
                    value={platformSettings.minInvestment}
                    onChange={(e) => setPlatformSettings(prev => ({
                      ...prev,
                      minInvestment: Number(e.target.value)
                    }))}
                  />
                  <p className="text-sm text-muted-foreground">
                    Minimum units per investment
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxInvestment">Maximum Units</Label>
                  <Input
                    id="maxInvestment"
                    type="number"
                    value={platformSettings.maxInvestment}
                    onChange={(e) => setPlatformSettings(prev => ({
                      ...prev,
                      maxInvestment: Number(e.target.value)
                    }))}
                  />
                  <p className="text-sm text-muted-foreground">
                    Maximum units per investment
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Referral Program</CardTitle>
              <CardDescription>
                Configure referral bonus settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-w-sm">
                <Label htmlFor="referralBonus">Referral Bonus (%)</Label>
                <Input
                  id="referralBonus"
                  type="number"
                  step="0.1"
                  value={platformSettings.referralBonus}
                  onChange={(e) => setPlatformSettings(prev => ({
                    ...prev,
                    referralBonus: Number(e.target.value)
                  }))}
                />
                <p className="text-sm text-muted-foreground">
                  Percentage bonus for successful referrals
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payout Settings</CardTitle>
              <CardDescription>
                Configure withdrawal and payout parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2 max-w-sm">
                <Label htmlFor="withdrawalMin">Minimum Withdrawal (NGN)</Label>
                <Input
                  id="withdrawalMin"
                  type="number"
                  value={platformSettings.withdrawalMinimum}
                  onChange={(e) => setPlatformSettings(prev => ({
                    ...prev,
                    withdrawalMinimum: Number(e.target.value)
                  }))}
                />
                <p className="text-sm text-muted-foreground">
                  Minimum amount required for withdrawal
                </p>
              </div>

              <div className="flex items-center justify-between max-w-sm">
                <div className="space-y-0.5">
                  <Label>Automatic Payouts</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically process approved withdrawals
                  </p>
                </div>
                <Switch
                  checked={platformSettings.autoPayouts}
                  onCheckedChange={(checked) => setPlatformSettings(prev => ({
                    ...prev,
                    autoPayouts: checked
                  }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Controls</CardTitle>
              <CardDescription>
                Manage platform availability and features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between max-w-sm">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Temporarily disable access to the platform
                  </p>
                </div>
                <Switch
                  checked={platformSettings.maintenanceMode}
                  onCheckedChange={(checked) => setPlatformSettings(prev => ({
                    ...prev,
                    maintenanceMode: checked
                  }))}
                />
              </div>

              <div className="flex items-center justify-between max-w-sm">
                <div className="space-y-0.5">
                  <Label>New Registrations</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow new users to register
                  </p>
                </div>
                <Switch
                  checked={platformSettings.newRegistrations}
                  onCheckedChange={(checked) => setPlatformSettings(prev => ({
                    ...prev,
                    newRegistrations: checked
                  }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
