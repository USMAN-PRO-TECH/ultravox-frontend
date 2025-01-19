import { Button } from "@/components/ui/button"
import { Mic, Settings, Zap } from 'lucide-react'

interface NavBarProps {
  activeTab: 'prompt' | 'setup' | 'action';
}

export function NavBar({ activeTab }: NavBarProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="inline-flex items-center gap-1 rounded-lg bg-gray-50 p-1">
        <Button 
          variant="ghost" 
          className={`flex items-center gap-2 ${
            activeTab === 'prompt' 
              ? 'bg-white text-black shadow-sm' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Mic className="h-4 w-4" />
          Prompt
        </Button>
        <Button 
          variant="ghost" 
          className={`flex items-center gap-2 ${
            activeTab === 'setup' 
              ? 'bg-white text-black shadow-sm' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Settings className="h-4 w-4" />
          Setup
        </Button>
        <Button 
          variant="ghost" 
          className={`flex items-center gap-2 ${
            activeTab === 'action' 
              ? 'bg-white text-black shadow-sm' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Zap className="h-4 w-4" />
          Action
        </Button>
      </div>

    </div>
  )
}

