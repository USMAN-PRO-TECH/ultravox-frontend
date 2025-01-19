'use client'

import { useAuth } from '@/app/contexts/AuthContext'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div> // Or your loading component
  }

  if (!isAuthenticated) {
    redirect('/login')
  }

  return <>{children}</>
} 