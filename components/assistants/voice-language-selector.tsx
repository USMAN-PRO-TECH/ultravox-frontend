import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { VoiceSelector } from "@/components/voices/voice-selector"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Clock, Check } from 'lucide-react'
import { assistantService } from "../../src/services/assistantService"

import { GB, ES, FR } from 'country-flag-icons/react/3x2'
import { showToast } from '@/lib/toast';
import { toast } from 'react-hot-toast';

const languageIcons = {
  en: <GB className="h-4 w-4" />,
  es: <ES className="h-4 w-4" />,
  fr: <FR className="h-4 w-4" />
}

export function VoiceLanguageSelector() {
  const params = useParams()
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  // Fetch initial language
  useEffect(() => {
    const fetchAssistantLanguage = async () => {
      const { data } = await assistantService.getAssistant(params.id.toString())
      setSelectedLanguage(data.language || "en")
    }
    fetchAssistantLanguage()
  }, [params.id])

  const handleLanguageChange = async (value: string) => {
    const loadingToast = showToast.loading("Updating language...");
    try {
      const response = await assistantService.updateAssistant(params.id.toString(), {
        language: value,
      });
      
      if (response) {
        setSelectedLanguage(value);
        toast.dismiss(loadingToast);
        showToast.success("Language updated successfully");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      showToast.error("Failed to update language");
      console.error("Error updating language:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Voice and Language</h2>
      <div className="flex items-center gap-3">
        <VoiceSelector />

        <Select 
          defaultValue={selectedLanguage} 
          value={selectedLanguage} 
          onValueChange={handleLanguageChange}
        >
          <SelectTrigger className="h-11 w-[180px] px-3">
            <div className="flex items-center gap-1.5">
              {languageIcons[selectedLanguage as keyof typeof languageIcons]}
              <SelectValue placeholder="Select language" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">
              <div className="flex items-center gap-2">
                {/* <GB className="h-4 w-4" /> */}
                <span>English</span>
              </div>
            </SelectItem>
            <SelectItem value="es">
              <div className="flex items-center gap-2">
                {/* <ES className="h-4 w-4" /> */}
                <span>Spanish</span>
              </div>
            </SelectItem>
            <SelectItem value="fr">
              <div className="flex items-center gap-2">
                {/* <FR className="h-4 w-4" /> */}
                <span>French</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

       
      </div>
    </div>
  )
}

