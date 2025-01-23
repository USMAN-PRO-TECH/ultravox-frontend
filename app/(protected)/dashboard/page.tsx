'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/DashBoard/search-input"
import { AssistantsTable } from "@/components/DashBoard/assistants-table"

import type { Assistant } from "@/lib/types/assistants"
import { TemplateSelector } from "@/components/modal/createAssistant/template-selector"
const initialAssistants: Assistant[] = [
  {
    id: "1",
    name: "New Assistant",
    status: "Active",
    phoneNumber: undefined,
    voice: "Kate - attractive and cheeky",
    calls: 0,
  },
]

export default function AssistantsPage() {
  const [open, setOpen] = useState(false)
  const [assistants, setAssistants] = useState<Assistant[]>(initialAssistants)
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(7)

  const filteredAssistants = assistants.filter((assistant) =>
    assistant.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id: string) => {
    setAssistants(assistants.filter((assistant) => assistant.id !== id))
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-white z-10 radial-gradient-bg-sidebar-green">
        <div className="w-[300px]">
          {/* <SearchInput
            placeholder="Search by name"
            onChange={setSearch}
          /> */}
        </div>
        <Button onClick={() => setOpen(true)}>Create an Assistant</Button>
        {open && <TemplateSelector open={open} onOpenChange={setOpen} />}
      </div>
      <div className="flex-1 p-6">
        <div className="w-full bg-white border rounded-md radial-gradient-bg-sidebar-green">
          <AssistantsTable
            // assistants={filteredAssistants}
            // onDelete={handleDelete}
          />
        </div>
     
      </div>
    </div>
  )
}

