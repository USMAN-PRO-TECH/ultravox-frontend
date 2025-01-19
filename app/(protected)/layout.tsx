'use client'

import { SidebarProvider, Sidebar, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/SideBar"
import ProtectedRoute from '@/app/components/ProtectedRoute'
import { useState } from "react"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(true)

  return (
    <ProtectedRoute>
      <SidebarProvider defaultOpen={true} open={open} onOpenChange={setOpen}>
        <div className="flex min-h-screen w-full">
          <Sidebar className="shrink-0 border-r z-30">
            <AppSidebar />
          </Sidebar>
          <div className="flex-1 flex flex-col min-w-0 relative">
            <div className="sticky top-0 flex items-center h-14 px-4 border-b bg-white z-20">
              <SidebarTrigger />
            </div>
            <main className="flex-1 min-w-0 w-full bg-white">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  )
} 