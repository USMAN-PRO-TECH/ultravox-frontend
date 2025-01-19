"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Home, Phone, BookOpen, List, Settings, Activity, Layers, Key, ChevronUp, Menu, Wrench } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import { useAuth } from '@/app/contexts/AuthContext'

const navigation = [
  { name: "Assistants", icon: Home, href: "/dashboard", protected: true },
  // { name: "Phone Numbers", icon: Phone, href: "/phone-numbers", protected: true },
  // { name: "Knowledge Base", icon: BookOpen, href: "/knowledge-base", protected: true },
  // { name: "Batch Calls", icon: List, href: "/batch-calls", protected: true },
  { name: "Settings", icon: Settings, href: "/settings", protected: true },
  { name: "Logs", icon: Activity, href: "/logs", protected: true },
  // { name: "Integrations", icon: Layers, href: "/integrations", protected: true },
  // { name: "API Key", icon: Key, href: "/api-key", protected: true },
  // { name: "Tools", icon: Wrench, href: "/dashboard/tools", protected: true },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AppSidebar
({ className }: SidebarProps) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <SidebarContent pathname={pathname} isAuthenticated={isAuthenticated} />
      </SheetContent>
      <div className={cn("hidden h-screen border-r md:block", className)}>
        <SidebarContent pathname={pathname} isAuthenticated={isAuthenticated} />
      </div>
    </Sheet>
  )
}

function SidebarContent({ pathname, isAuthenticated }: { pathname: string, isAuthenticated: boolean }) {
  return (
    <div className="flex h-full flex-col radial-gradient-bg-sidebar-green text-white">
      <div className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black">
            {/* <span className="text-xl font-bold text-white">C</span> */}
            <img src="/cryp-logo.jpeg" alt="logo" className="h-10 w-10 rounded-lg" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">Max Profit</h2>
            <p className="text-sm text-muted-foreground">To the moon</p>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <nav className="space-y-1 p-2 text-white">
          {navigation.map((item) => {
            if (item.protected && !isAuthenticated) return null;

            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors text-white",
                  isActive
                    ? "bg-gray-100   hover:bg-gray-200 text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" color="#25f111" />
                <span className="text-white">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Usage</span>
            <span>Free Plan</span>
          </div>
          <Progress value={0} className="h-2" />
          <div className="text-xs text-muted-foreground">
            0/10 minutes used
          </div>
        </div>
        <Button className="w-full bg-black text-white hover:bg-black/90">
          Upgrade Plan
        </Button>
        <div className="flex items-center gap-3 rounded-lg border p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
            <span className="text-sm font-medium text-white">S</span>
          </div>
          <div className="flex-1 truncate text-sm">
            sherazzafar148@gmail.com
          </div>
          <ChevronUp className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}

