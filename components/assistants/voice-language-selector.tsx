import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { VoiceSelector } from "@/components/voices/voice-selector"
import { VoiceSelectorButtons } from "@/components/voices/voice-selector-buttons"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Clock, Check } from 'lucide-react'
import { assistantService } from "../../src/services/assistantService"

import { GB, ES, FR } from 'country-flag-icons/react/3x2'
import { showToast } from '@/lib/toast';
import { toast } from 'react-hot-toast';
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { fetchVoiceList } from "@/store/actions/voiceActions"

const languageIcons = {
  en: <GB className="h-4 w-4" />,
  es: <ES className="h-4 w-4" />,
  fr: <FR className="h-4 w-4" />
}

export function VoiceLanguageSelector() {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>();
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [selectedVoice, setSelectedVoice] = useState<string>("")
  const [currentVoice, setCurrentVoice] = useState<string>(selectedVoice);

  // Fetch initial language
  useEffect(() => {
    const fetchAssistantLanguage = async () => {
      const { data } = await assistantService.getAssistant(params.id.toString())
      setSelectedLanguage(data.language || "en")
    }
    fetchAssistantLanguage()
    dispatch(fetchVoiceList());
    // Fetch current assistant voice
    const fetchCurrentVoice = async () => {
      try {
        const assistant = await assistantService.getAssistant(params.id.toString());
        if (assistant.data.providerId) {
          setCurrentVoice(assistant.data.providerId);
          setSelectedVoice(assistant.data.providerId);
        }
      } catch (error) {
        console.error("Error fetching current voice:", error);
      }
    };
    fetchCurrentVoice();

  }, [dispatch, params.id])

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
      <h2 className="text-lg font-semibold">Voice and Charactors</h2>
      <div className="flex items-center gap-5">
        <VoiceSelector setSelectedVoice={setSelectedVoice} selectedVoice={selectedVoice} /> 
        {/* <Select 
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
                <span>English</span>
              </div>
            </SelectItem>
            <SelectItem value="es">
              <div className="flex items-center gap-2"> 
                <span>Spanish</span>
              </div>
            </SelectItem>
            <SelectItem value="fr">
              <div className="flex items-center gap-2"> 
                <span>French</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select> */} 
      </div>
      <div className="flex items-center gap-3">
        <VoiceSelectorButtons setSelectedVoice={setSelectedVoice} selectedVoice={selectedVoice} />
       </div>
    </div>
  )
}

