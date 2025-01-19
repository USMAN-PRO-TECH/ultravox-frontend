'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, initializeAuth } from '@/store/slices/authSlice'
import type { AppDispatch, RootState } from '@/store/store'

interface AuthContextType {
  user: any | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  
  const { user, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  )

  const handleLogin = async (email: string, password: string) => {
    await dispatch(login({ email, password })).unwrap()
  }

  const handleLogout = async () => {
    await dispatch(logout())
    router.push('/login')
  }

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        logout: handleLogout,
        isAuthenticated,
        isLoading,
      }}
    >
      {!isLoading ? children : null}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 