import type { Timestamp } from 'firebase/firestore'

export interface User {
  id: string
  email: string
  displayName: string
  photoURL?: string
  phoneNumber?: string
  isVerified: boolean
  idVerificationStatus: 'pending' | 'verified' | 'rejected' | 'none'
  idDocumentURL?: string
  faceVerificationURL?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Wallet {
  id: string
  userId: string
  balance: number
  lockedFunds: number
  totalEarnings: number
  totalWithdrawn: number
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Project {
  id: string
  name: string
  description: string
  imageURL: string
  totalCapacityKW: number
  pricePerUnit: number
  totalUnits: number
  unitsSold: number
  expectedROI: number // Annual percentage
  status: 'active' | 'funded' | 'completed' | 'closed'
  location: string
  startDate: Timestamp
  endDate?: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Investment {
  id: string
  userId: string
  projectId: string
  projectName: string
  unitsBought: number
  totalAmount: number
  purchasePrice: number
  currentValue: number
  totalEarnings: number
  status: 'active' | 'matured' | 'withdrawn'
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Transaction {
  id: string
  userId: string
  type: 'deposit' | 'withdrawal' | 'investment' | 'earning' | 'payout'
  amount: number
  status: 'pending' | 'completed' | 'failed'
  description: string
  reference?: string
  projectId?: string
  createdAt: Timestamp
}

export interface DailyRevenue {
  id: string
  projectId: string
  date: string // YYYY-MM-DD format
  energyGenerated: number // kWh
  tariff: number // per kWh
  totalRevenue: number
  createdAt: Timestamp
}

export interface InvestorEarning {
  id: string
  userId: string
  investmentId: string
  projectId: string
  date: string
  unitsOwned: number
  ownershipPercentage: number
  dailyRevenue: number
  earning: number
  createdAt: Timestamp
}

export interface Testimonial {
  id: string
  userId: string
  userName: string
  userPhoto?: string
  content: string
  rating: number
  investmentAmount: number
  createdAt: Timestamp
}

export interface Referral {
  id: string
  referrerId: string
  referredId: string
  status: 'pending' | 'completed'
  bonus: number
  createdAt: Timestamp
}

// Chart data types
export interface ChartDataPoint {
  date: string
  value: number
  earnings?: number
}

export interface PortfolioStats {
  totalInvested: number
  currentValue: number
  totalEarnings: number
  profitPercentage: number
  activeInvestments: number
}
