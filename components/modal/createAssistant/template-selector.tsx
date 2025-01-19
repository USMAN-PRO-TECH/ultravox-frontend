'use client'

import { useState } from "react"
import { Search } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TemplateCard } from "./template-card"
import type { Template, Category } from "@/lib/types/template"

const categories: Category[] = [
  { name: "All templates", count: 0 },
  { name: "Real Estate", count: 4 },
  { name: "Healthcare", count: 1 },
  { name: "Solar", count: 0 },
  { name: "Recruitment", count: 3 },
  { name: "Car Dealership", count: 3 },
  { name: "Mortgage", count: 2 },
  { name: "Hospitality", count: 1 },
  { name: "Insurance", count: 2 },
]

const templates: Template[] = [
  {
    id: "1",
    name: "Paul AI",
    category: "Real Estate",
    avatar: "/placeholder.svg",
    type: "Inbound"
  },
  {
    id: "2",
    name: "Allen AI",
    category: "Real Estate",
    avatar: "/placeholder.svg",
    type: "Outbound"
  },
  {
    id: "3",
    name: "Drew AI",
    category: "Recruitment",
    avatar: "/placeholder.svg",
    type: "Inbound"
  },
  {
    id: "4",
    name: "Serena AI",
    category: "Real Estate",
    avatar: "/placeholder.svg",
    type: "Outbound"
  },
  {
    id: "5",
    name: "Adam AI",
    category: "Recruitment",
    avatar: "/placeholder.svg",
    type: "Inbound"
  },
  {
    id: "6",
    name: "Beatrice AI",
    category: "Recruitment",
    avatar: "/placeholder.svg",
    type: "Outbound"
  },
]

interface TemplateSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TemplateSelector({ open, onOpenChange }: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState("All templates")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("Inbound")

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "All templates" || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = template.type === selectedType
    return matchesCategory && matchesSearch && matchesType
  })
  


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Select Template</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-[240px_1fr] gap-6 h-[600px]">
          <div className="space-y-4">
            <div className="font-medium">Templates</div>
            <ScrollArea className="h-[calc(600px-2rem)]">
              <div className="space-y-1">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                    <span className="ml-auto text-muted-foreground">
                      {category.count}
                    </span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="space-y-4">
            <Tabs defaultValue="Inbound" onValueChange={setSelectedType}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="Inbound">Inbound</TabsTrigger>
                  <TabsTrigger value="Outbound">Outbound</TabsTrigger>
                </TabsList>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name"
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <TabsContent value="Inbound" className="m-0">
                <ScrollArea className="h-[calc(600px-6rem)]">
                  <div className="grid grid-cols-2 gap-4">
                    {filteredTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        // onViewDetails={(id) => console.log('View details:', id)}
                        onOpenChange={onOpenChange}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="Outbound" className="m-0">
                <ScrollArea className="h-[calc(600px-6rem)]">
                  <div className="grid grid-cols-2 gap-4">
                    {filteredTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        // onViewDetails={(id) => console.log('View details:', id)}
                        onOpenChange={onOpenChange}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}



