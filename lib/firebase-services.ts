// REMEBER THE CODE BELOW AND REVIEW IT, MAKE SURE TO USE IT LATER AS THE MAIN CODE AS THIS ONE IS TO SHOW CLIENT
export const adminService = {
  async getWithdrawalRequests() {
    return []
  },

  async approveWithdrawal(id: string) {
    console.log("Approved:", id)
  },

  async rejectWithdrawal(id: string, reason: string) {
    console.log("Rejected:", id, reason)
  },
}

export const projectService = {
  async getProjects() {
    return []
  },

  async createProject(data: any) {
    console.log("Project created:", data)
  },
}

export const uploadVerificationDocument = async () => {
  console.log("Upload called")
}

// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   setDoc,
//   updateDoc,
//   query,
//   where,
//   orderBy,
//   limit,
//   addDoc,
//   serverTimestamp,
//   increment,
//   Timestamp,
// } from 'firebase/firestore'
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// import { db, storage } from './firebase'
// import type {
//   User,
//   Wallet,
//   Project,
//   Investment,
//   Transaction,
//   DailyRevenue,
//   InvestorEarning,
//   Testimonial,
//   PortfolioStats,
//   ChartDataPoint,
// } from './types'

// // ============ USER SERVICES ============

// export async function getUserData(userId: string): Promise<User | null> {
//   const userDoc = await getDoc(doc(db, 'users', userId))
//   if (userDoc.exists()) {
//     return { id: userDoc.id, ...userDoc.data() } as User
//   }
//   return null
// }

// export async function updateUserProfile(userId: string, data: Partial<User>): Promise<void> {
//   await updateDoc(doc(db, 'users', userId), {
//     ...data,
//     updatedAt: serverTimestamp(),
//   })
// }

// export async function uploadVerificationDocument(
//   userId: string,
//   file: File,
//   type: 'id' | 'face'
// ): Promise<string> {
//   const storageRef = ref(storage, `verifications/${userId}/${type}_${Date.now()}`)
//   await uploadBytes(storageRef, file)
//   const downloadURL = await getDownloadURL(storageRef)
  
//   const updateData = type === 'id' 
//     ? { idDocumentURL: downloadURL, idVerificationStatus: 'pending' as const }
//     : { faceVerificationURL: downloadURL }
  
//   await updateUserProfile(userId, updateData)
//   return downloadURL
// }

// // ============ WALLET SERVICES ============

// export async function getWallet(userId: string): Promise<Wallet | null> {
//   const walletDoc = await getDoc(doc(db, 'wallets', userId))
//   if (walletDoc.exists()) {
//     return { id: walletDoc.id, ...walletDoc.data() } as Wallet
//   }
//   return null
// }

// export async function updateWalletBalance(
//   userId: string,
//   amount: number,
//   type: 'add' | 'subtract' | 'lock' | 'unlock'
// ): Promise<void> {
//   const walletRef = doc(db, 'wallets', userId)
  
//   switch (type) {
//     case 'add':
//       await updateDoc(walletRef, {
//         balance: increment(amount),
//         updatedAt: serverTimestamp(),
//       })
//       break
//     case 'subtract':
//       await updateDoc(walletRef, {
//         balance: increment(-amount),
//         updatedAt: serverTimestamp(),
//       })
//       break
//     case 'lock':
//       await updateDoc(walletRef, {
//         balance: increment(-amount),
//         lockedFunds: increment(amount),
//         updatedAt: serverTimestamp(),
//       })
//       break
//     case 'unlock':
//       await updateDoc(walletRef, {
//         balance: increment(amount),
//         lockedFunds: increment(-amount),
//         updatedAt: serverTimestamp(),
//       })
//       break
//   }
// }

// export async function addEarningsToWallet(userId: string, amount: number): Promise<void> {
//   await updateDoc(doc(db, 'wallets', userId), {
//     balance: increment(amount),
//     totalEarnings: increment(amount),
//     updatedAt: serverTimestamp(),
//   })
// }

// // ============ PROJECT SERVICES ============

// export async function getProjects(status?: Project['status']): Promise<Project[]> {
//   let q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
  
//   if (status) {
//     q = query(
//       collection(db, 'projects'),
//       where('status', '==', status),
//       orderBy('createdAt', 'desc')
//     )
//   }
  
//   const snapshot = await getDocs(q)
//   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project))
// }

// export async function getProject(projectId: string): Promise<Project | null> {
//   const projectDoc = await getDoc(doc(db, 'projects', projectId))
//   if (projectDoc.exists()) {
//     return { id: projectDoc.id, ...projectDoc.data() } as Project
//   }
//   return null
// }

// export async function createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
//   const docRef = await addDoc(collection(db, 'projects'), {
//     ...data,
//     createdAt: serverTimestamp(),
//     updatedAt: serverTimestamp(),
//   })
//   return docRef.id
// }

// export async function updateProject(projectId: string, data: Partial<Project>): Promise<void> {
//   await updateDoc(doc(db, 'projects', projectId), {
//     ...data,
//     updatedAt: serverTimestamp(),
//   })
// }

// // ============ INVESTMENT SERVICES ============

// export async function getUserInvestments(userId: string): Promise<Investment[]> {
//   const q = query(
//     collection(db, 'investments'),
//     where('userId', '==', userId),
//     orderBy('createdAt', 'desc')
//   )
//   const snapshot = await getDocs(q)
//   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Investment))
// }

// export async function getInvestment(investmentId: string): Promise<Investment | null> {
//   const investmentDoc = await getDoc(doc(db, 'investments', investmentId))
//   if (investmentDoc.exists()) {
//     return { id: investmentDoc.id, ...investmentDoc.data() } as Investment
//   }
//   return null
// }

// export async function createInvestment(
//   userId: string,
//   project: Project,
//   units: number
// ): Promise<string> {
//   const totalAmount = units * project.pricePerUnit
  
//   // Create investment document
//   const investmentRef = await addDoc(collection(db, 'investments'), {
//     userId,
//     projectId: project.id,
//     projectName: project.name,
//     unitsBought: units,
//     totalAmount,
//     purchasePrice: project.pricePerUnit,
//     currentValue: totalAmount,
//     totalEarnings: 0,
//     status: 'active',
//     createdAt: serverTimestamp(),
//     updatedAt: serverTimestamp(),
//   })

//   // Update project units sold
//   await updateDoc(doc(db, 'projects', project.id), {
//     unitsSold: increment(units),
//     updatedAt: serverTimestamp(),
//   })

//   // Lock funds in wallet
//   await updateWalletBalance(userId, totalAmount, 'lock')

//   // Record transaction
//   await createTransaction({
//     userId,
//     type: 'investment',
//     amount: totalAmount,
//     status: 'completed',
//     description: `Investment in ${project.name} - ${units} units`,
//     projectId: project.id,
//   })

//   return investmentRef.id
// }

// // ============ TRANSACTION SERVICES ============

// export async function getUserTransactions(
//   userId: string,
//   limitCount = 50
// ): Promise<Transaction[]> {
//   const q = query(
//     collection(db, 'transactions'),
//     where('userId', '==', userId),
//     orderBy('createdAt', 'desc'),
//     limit(limitCount)
//   )
//   const snapshot = await getDocs(q)
//   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction))
// }

// export async function createTransaction(
//   data: Omit<Transaction, 'id' | 'createdAt'>
// ): Promise<string> {
//   const docRef = await addDoc(collection(db, 'transactions'), {
//     ...data,
//     createdAt: serverTimestamp(),
//   })
//   return docRef.id
// }

// // ============ REVENUE & EARNINGS SERVICES ============

// export async function getDailyRevenue(projectId: string, days = 30): Promise<DailyRevenue[]> {
//   const startDate = new Date()
//   startDate.setDate(startDate.getDate() - days)
  
//   const q = query(
//     collection(db, 'dailyRevenue'),
//     where('projectId', '==', projectId),
//     orderBy('date', 'desc'),
//     limit(days)
//   )
//   const snapshot = await getDocs(q)
//   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DailyRevenue))
// }

// export async function recordDailyRevenue(
//   projectId: string,
//   energyGenerated: number,
//   tariff: number
// ): Promise<void> {
//   const today = new Date().toISOString().split('T')[0]
//   const totalRevenue = energyGenerated * tariff

//   await setDoc(doc(db, 'dailyRevenue', `${projectId}_${today}`), {
//     projectId,
//     date: today,
//     energyGenerated,
//     tariff,
//     totalRevenue,
//     createdAt: serverTimestamp(),
//   })
// }

// export async function getUserEarnings(userId: string, days = 30): Promise<InvestorEarning[]> {
//   const q = query(
//     collection(db, 'investorEarnings'),
//     where('userId', '==', userId),
//     orderBy('date', 'desc'),
//     limit(days)
//   )
//   const snapshot = await getDocs(q)
//   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as InvestorEarning))
// }

// export async function calculateAndDistributeEarnings(
//   projectId: string,
//   dailyRevenue: number
// ): Promise<void> {
//   // Get all investments for this project
//   const q = query(
//     collection(db, 'investments'),
//     where('projectId', '==', projectId),
//     where('status', '==', 'active')
//   )
//   const snapshot = await getDocs(q)
  
//   const project = await getProject(projectId)
//   if (!project) return
  
//   const today = new Date().toISOString().split('T')[0]
  
//   for (const investmentDoc of snapshot.docs) {
//     const investment = { id: investmentDoc.id, ...investmentDoc.data() } as Investment
//     const ownershipPercentage = investment.unitsBought / project.totalUnits
//     const earning = dailyRevenue * ownershipPercentage
    
//     // Record earning
//     await addDoc(collection(db, 'investorEarnings'), {
//       userId: investment.userId,
//       investmentId: investment.id,
//       projectId,
//       date: today,
//       unitsOwned: investment.unitsBought,
//       ownershipPercentage,
//       dailyRevenue,
//       earning,
//       createdAt: serverTimestamp(),
//     })
    
//     // Update investment total earnings
//     await updateDoc(doc(db, 'investments', investment.id), {
//       totalEarnings: increment(earning),
//       currentValue: increment(earning),
//       updatedAt: serverTimestamp(),
//     })
    
//     // Add to wallet
//     await addEarningsToWallet(investment.userId, earning)
    
//     // Record transaction
//     await createTransaction({
//       userId: investment.userId,
//       type: 'earning',
//       amount: earning,
//       status: 'completed',
//       description: `Daily earnings from ${project.name}`,
//       projectId,
//     })
//   }
// }

// // ============ PORTFOLIO STATS ============

// export async function getPortfolioStats(userId: string): Promise<PortfolioStats> {
//   const investments = await getUserInvestments(userId)
  
//   const totalInvested = investments.reduce((sum, inv) => sum + inv.totalAmount, 0)
//   const currentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0)
//   const totalEarnings = investments.reduce((sum, inv) => sum + inv.totalEarnings, 0)
//   const activeInvestments = investments.filter(inv => inv.status === 'active').length
//   const profitPercentage = totalInvested > 0 
//     ? ((currentValue - totalInvested) / totalInvested) * 100 
//     : 0

//   return {
//     totalInvested,
//     currentValue,
//     totalEarnings,
//     profitPercentage,
//     activeInvestments,
//   }
// }

// export async function getPortfolioChartData(userId: string, days = 30): Promise<ChartDataPoint[]> {
//   const earnings = await getUserEarnings(userId, days)
  
//   // Group earnings by date
//   const earningsByDate = earnings.reduce((acc, earning) => {
//     if (!acc[earning.date]) {
//       acc[earning.date] = 0
//     }
//     acc[earning.date] += earning.earning
//     return acc
//   }, {} as Record<string, number>)
  
//   // Create chart data
//   const chartData: ChartDataPoint[] = []
//   let cumulativeValue = 0
  
//   // Sort dates and create cumulative values
//   const sortedDates = Object.keys(earningsByDate).sort()
//   for (const date of sortedDates) {
//     cumulativeValue += earningsByDate[date]
//     chartData.push({
//       date,
//       value: cumulativeValue,
//       earnings: earningsByDate[date],
//     })
//   }
  
//   return chartData
// }

// // ============ TESTIMONIALS ============

// export async function getTestimonials(limitCount = 20): Promise<Testimonial[]> {
//   const q = query(
//     collection(db, 'testimonials'),
//     orderBy('createdAt', 'desc'),
//     limit(limitCount)
//   )
//   const snapshot = await getDocs(q)
//   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial))
// }

// export async function createTestimonial(
//   data: Omit<Testimonial, 'id' | 'createdAt'>
// ): Promise<string> {
//   const docRef = await addDoc(collection(db, 'testimonials'), {
//     ...data,
//     createdAt: serverTimestamp(),
//   })
//   return docRef.id
// }

// // ============ REFERRALS ============

// export async function createReferral(referrerId: string, referredId: string): Promise<void> {
//   await addDoc(collection(db, 'referrals'), {
//     referrerId,
//     referredId,
//     status: 'pending',
//     bonus: 0,
//     createdAt: serverTimestamp(),
//   })
// }

// export async function getUserReferrals(userId: string): Promise<number> {
//   const q = query(
//     collection(db, 'referrals'),
//     where('referrerId', '==', userId),
//     where('status', '==', 'completed')
//   )
//   const snapshot = await getDocs(q)
//   return snapshot.size
// }

// // ============ ADMIN SERVICES ============

// export async function getAllUsers(): Promise<User[]> {
//   const snapshot = await getDocs(collection(db, 'users'))
//   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User))
// }

// export async function getAllInvestments(): Promise<Investment[]> {
//   const q = query(collection(db, 'investments'), orderBy('createdAt', 'desc'))
//   const snapshot = await getDocs(q)
//   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Investment))
// }

// export async function getPlatformStats(): Promise<{
//   totalUsers: number
//   totalInvestments: number
//   totalActiveInvestments: number
//   totalRevenue: number
//   totalPayouts: number
// }> {
//   const users = await getAllUsers()
//   const investments = await getAllInvestments()
  
//   const totalActiveInvestments = investments.reduce(
//     (sum, inv) => sum + (inv.status === 'active' ? inv.totalAmount : 0),
//     0
//   )
//   const totalRevenue = investments.reduce((sum, inv) => sum + inv.totalEarnings, 0)
  
//   // Get total payouts
//   const payoutsQuery = query(
//     collection(db, 'transactions'),
//     where('type', '==', 'withdrawal'),
//     where('status', '==', 'completed')
//   )
//   const payoutsSnapshot = await getDocs(payoutsQuery)
//   const totalPayouts = payoutsSnapshot.docs.reduce(
//     (sum, doc) => sum + (doc.data().amount || 0),
//     0
//   )

//   return {
//     totalUsers: users.length,
//     totalInvestments: investments.length,
//     totalActiveInvestments,
//     totalRevenue,
//     totalPayouts,
//   }
// }

// // ============ SEED DATA (for demo purposes) ============

// export async function seedDemoData(): Promise<void> {
//   // Check if demo data already exists
//   const projects = await getProjects()
//   if (projects.length > 0) return

//   // Create demo projects
//   const demoProjects = [
//     {
//       name: 'Lagos Solar Farm Phase 1',
//       description: 'A 500kW solar installation in Lekki providing clean energy to over 200 households.',
//       imageURL: '/projects/solar-farm-1.jpg',
//       totalCapacityKW: 500,
//       pricePerUnit: 50000,
//       totalUnits: 10000,
//       unitsSold: 7500,
//       expectedROI: 15,
//       status: 'active' as const,
//       location: 'Lekki, Lagos',
//       startDate: Timestamp.fromDate(new Date('2024-01-15')),
//     },
//     {
//       name: 'Abuja Commercial Solar',
//       description: 'Commercial rooftop solar installation serving major business districts.',
//       imageURL: '/projects/solar-farm-2.jpg',
//       totalCapacityKW: 750,
//       pricePerUnit: 75000,
//       totalUnits: 15000,
//       unitsSold: 5000,
//       expectedROI: 18,
//       status: 'active' as const,
//       location: 'Wuse, Abuja',
//       startDate: Timestamp.fromDate(new Date('2024-03-01')),
//     },
//     {
//       name: 'Port Harcourt Industrial Solar',
//       description: 'Large-scale industrial solar project powering manufacturing facilities.',
//       imageURL: '/projects/solar-farm-3.jpg',
//       totalCapacityKW: 1000,
//       pricePerUnit: 100000,
//       totalUnits: 20000,
//       unitsSold: 2000,
//       expectedROI: 20,
//       status: 'active' as const,
//       location: 'Trans Amadi, Port Harcourt',
//       startDate: Timestamp.fromDate(new Date('2024-06-01')),
//     },
//       {
//       name: 'Daniel solar Industrial Solar',
//       description: 'Large-scale industrial solar project powering manufacturing facilities.',
//       imageURL: '/projects/solar-farm-3.jpg',
//       totalCapacityKW: 1000,
//       pricePerUnit: 100000,
//       totalUnits: 20000,
//       unitsSold: 2000,
//       expectedROI: 20,
//       status: 'active' as const,
//       location: 'Trans Amadi, Port Harcourt',
//       startDate: Timestamp.fromDate(new Date('2024-06-01')),
//     },

//    {
//       name: ' solar Industrial Solar',
//       description: 'Large-scale industrial solar project powering manufacturing facilities.',
//       imageURL: '/projects/solar-farm-3.jpg',
//       totalCapacityKW: 1000,
//       pricePerUnit: 100000,
//       totalUnits: 20000,
//       unitsSold: 2000,
//       expectedROI: 20,
//       status: 'active' as const,
//       location: 'Trans Amadi, Port Harcourt',
//       startDate: Timestamp.fromDate(new Date('2024-06-01')),
//     },   
//   ]

//   for (const project of demoProjects) {
//     await createProject(project)
//   }
// }
