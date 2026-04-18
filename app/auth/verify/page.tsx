"use client"

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Camera, Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import { uploadVerificationDocument } from '@/lib/firebase-services'
import { toast } from 'sonner'

type VerificationStep = 'id' | 'face' | 'complete'

export default function VerifyPage() {
  const router = useRouter()
  const { user, refreshUserData } = useAuth()
  const [step, setStep] = useState<VerificationStep>('id')
  const [idDocument, setIdDocument] = useState<File | null>(null)
  const [facePhoto, setFacePhoto] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [idPreview, setIdPreview] = useState<string | null>(null)
  const [facePreview, setFacePreview] = useState<string | null>(null)
  
  const idInputRef = useRef<HTMLInputElement>(null)
  const faceInputRef = useRef<HTMLInputElement>(null)

  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIdDocument(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setIdPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFaceCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFacePhoto(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setFacePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleIdSubmit = async () => {
    if (!idDocument || !user) {
      toast.error('Please upload an ID document')
      return
    }

    setUploading(true)
    try {
      await uploadVerificationDocument(user.uid, idDocument, 'id')
      toast.success('ID document uploaded successfully')
      setStep('face')
    } catch {
      toast.error('Failed to upload document')
    } finally {
      setUploading(false)
    }
  }

  const handleFaceSubmit = async () => {
    if (!facePhoto || !user) {
      toast.error('Please take a selfie')
      return
    }

    setUploading(true)
    try {
      await uploadVerificationDocument(user.uid, facePhoto, 'face')
      await refreshUserData()
      toast.success('Face photo uploaded successfully')
      setStep('complete')
    } catch {
      toast.error('Failed to upload photo')
    } finally {
      setUploading(false)
    }
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  const handleComplete = () => {
    router.push('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6 text-primary-foreground"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
              </svg>
            </div>
            <span className="text-2xl font-semibold">Opera</span>
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <StepIndicator step={1} label="ID" active={step === 'id'} complete={step === 'face' || step === 'complete'} />
          <div className="h-0.5 w-8 bg-border" />
          <StepIndicator step={2} label="Face" active={step === 'face'} complete={step === 'complete'} />
          <div className="h-0.5 w-8 bg-border" />
          <StepIndicator step={3} label="Done" active={step === 'complete'} complete={step === 'complete'} />
        </div>

        {step === 'id' && (
          <Card className="border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">ID Verification</CardTitle>
              <CardDescription>
                Upload a valid government-issued ID (Passport, Driver&apos;s License, or National ID)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className="relative flex aspect-video cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 transition-colors hover:border-primary"
                onClick={() => idInputRef.current?.click()}
              >
                {idPreview ? (
                  <img 
                    src={idPreview} 
                    alt="ID Preview" 
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <>
                    <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                  </>
                )}
                <input
                  ref={idInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleIdUpload}
                  className="hidden"
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleSkip}>
                  Skip for now
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleIdSubmit}
                  disabled={!idDocument || uploading}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'face' && (
          <Card className="border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Face Verification</CardTitle>
              <CardDescription>
                Take a clear selfie to verify your identity. Make sure your face is well-lit.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className="relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 transition-colors hover:border-primary"
                onClick={() => faceInputRef.current?.click()}
              >
                {facePreview ? (
                  <img 
                    src={facePreview} 
                    alt="Face Preview" 
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <>
                    <Camera className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to take a selfie</p>
                    <p className="text-xs text-muted-foreground">or upload a photo</p>
                  </>
                )}
                <input
                  ref={faceInputRef}
                  type="file"
                  accept="image/*"
                  capture="user"
                  onChange={handleFaceCapture}
                  className="hidden"
                />
              </div>
              
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">
                  <AlertCircle className="mr-1 inline-block h-3 w-3" />
                  Ensure your face is clearly visible and matches your ID photo
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleSkip}>
                  Skip for now
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleFaceSubmit}
                  disabled={!facePhoto || uploading}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    'Complete Verification'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'complete' && (
          <Card className="border-border">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-chart-1/20">
                <CheckCircle2 className="h-8 w-8 text-chart-1" />
              </div>
              <CardTitle className="text-2xl">Verification Submitted</CardTitle>
              <CardDescription>
                Your documents have been submitted for review. We&apos;ll notify you once your account is verified.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={handleComplete}>
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function StepIndicator({ 
  step, 
  label, 
  active, 
  complete 
}: { 
  step: number
  label: string
  active: boolean
  complete: boolean 
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
          complete
            ? 'bg-chart-1 text-white'
            : active
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground'
        }`}
      >
        {complete ? <CheckCircle2 className="h-4 w-4" /> : step}
      </div>
      <span className={`text-xs ${active ? 'text-foreground' : 'text-muted-foreground'}`}>
        {label}
      </span>
    </div>
  )
}
