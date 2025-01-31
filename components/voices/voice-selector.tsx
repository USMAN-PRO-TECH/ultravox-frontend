import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { fetchVoiceList } from "../../store/actions/voiceActions"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Skeleton } from "../ui/skeleton"
import { Voice } from "../../src/types/voice"
import { assistantService } from "../../src/services/assistantService"
import { useParams } from "next/navigation"
import { showToast } from '@/lib/toast';
import { toast } from 'react-hot-toast';

export function VoiceSelector({setSelectedVoice, selectedVoice}: {setSelectedVoice: (voice: string) => void, selectedVoice: string}) {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { voices, loading, error } = useSelector((state: RootState) => state.voices);
  const [currentVoice, setCurrentVoice] = useState<string>(selectedVoice);
  
  // useEffect(() => {
  //   dispatch(fetchVoiceList());
  //   // Fetch current assistant voice
  //   const fetchCurrentVoice = async () => {
  //     try {
  //       const assistant = await assistantService.getAssistant(params.id.toString());
  //       if (assistant.data.providerId) {
  //         setCurrentVoice(assistant.data.providerId);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching current voice:", error);
  //     }
  //   };
  //   fetchCurrentVoice();
  // }, [dispatch, params.id]);

  useMemo(() => { 
    console.log(selectedVoice);
      setCurrentVoice(selectedVoice); 
  }, [selectedVoice])
  
  const getVoiceImage = (voiceName: string): string => {
    const voiceImages: { [key: string]: string } = {
        "Trump": "/trump.webp",
        "Steve-English-Australian" : "/Steve-English-Australian.jpeg",
        "Emily-English": "/Emily-English.jpeg",
        "Tanya-English" : "/Tanya-English.jpeg",
        "Aaron-English" : "/Aaron-English.jpeg",
        "Hugo-French" : "/Hugo-French.jpeg",
        "Jinnah" : "/jinnah.jpg",
        // Add more mappings as needed
    };
    if (!voiceImages[voiceName]) {
        const voiceDescription = voices.find(voice => voice.name === voiceName)?.description || '';
        if (voiceDescription.toLowerCase().includes('female')) {
            return `https://avatar.iran.liara.run/public/girl?username=[${voiceName}]`;
        } else {
            return `https://avatar.iran.liara.run/public/boy?username=[${voiceName}]`;
        }
    }
    return voiceImages[voiceName] || `https://avatar.iran.liara.run/public/boy?username=[${voiceName}]` ;
};
const getVoiceName = (voiceName: string): string => {
  
    const voiceNames: { [key: string]: string } = {
        "Trump": "Donald Trump",
        "Steve-English-Australian" : "Bored Ape Yacht Club",
        "Emily-English": "CryptoPunks #1002",
        "Tanya-English" : "CryptoPunks #1003",
        "Aaron-English" : "CryptoPunks #1004",
        "Hugo-French" : "CryptoPunks #1005", 
        // Add more mappings as needed
    };
    return voiceNames[voiceName] || voiceName;
};
  const handleVoiceChange = async (selectedVoiceId: string) => {
    const loadingToast = showToast.loading("Updating voice...");
    try {
      // Find the selected voice object
      const selectedVoice = voices.find(voice => voice.voiceId === selectedVoiceId);
      
      if (selectedVoice) {
        await assistantService.updateAssistant(params.id.toString(), {
          provider: selectedVoice.name, // Using name as provider
          providerId: selectedVoice.voiceId // Using voiceId as providerId
        });
        await assistantService.getAssistant(params.id.toString());
        setSelectedVoice(selectedVoice.voiceId as string);
        toast.dismiss(loadingToast);
        showToast.success("Voice updated successfully");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      showToast.error("Failed to update voice");
      console.error("Error updating voice:", error);
    }
  };

  if (loading) {
    return <Skeleton className="h-11 w-[280px]" />;
  }

  if (error) {
    return <div className="text-red-500">Error loading voices: {error}</div>;
  }

  return (
    <Select 
      defaultValue={currentVoice || voices[0]?.voiceId}
      onValueChange={handleVoiceChange}
    >
      <SelectTrigger className="h-11 w-[280px] border-white">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/placeholder.svg" />
          </Avatar>
          <SelectValue placeholder="Select voice" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {voices.map((voice: Voice) => (
          <SelectItem key={voice.voiceId} value={voice.voiceId}>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={getVoiceImage(voice.name)} />
              </Avatar>
              <span>{getVoiceName(voice.name)}</span>
              </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 