import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Opera - Self-serve & Transparent Investment Platform',
  description: 'Invest with your family and friends. Pool resources, collaborate with like-minded individuals, and build wealth together through transparent solar energy investments.',
  keywords: ['investment', 'solar energy', 'crowd investing', 'renewable energy', 'Nigeria'],
  authors: [{ name: 'Opera Team' }],
  openGraph: {
    title: 'Opera - Self-serve & Transparent Investment Platform',
    description: 'Invest with your family and friends through transparent solar energy investments.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#f5f3ef',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
