import { useEffect, useState } from "react"
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

export function VoiceSelector() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { voices, loading, error } = useSelector((state: RootState) => state.voices);
  const [currentVoice, setCurrentVoice] = useState<string>("");
  
  useEffect(() => {
    dispatch(fetchVoiceList());
    // Fetch current assistant voice
    const fetchCurrentVoice = async () => {
      try {
        const assistant = await assistantService.getAssistant(params.id.toString());
        if (assistant.data.providerId) {
          setCurrentVoice(assistant.data.providerId);
        }
      } catch (error) {
        console.error("Error fetching current voice:", error);
      }
    };
    fetchCurrentVoice();
  }, [dispatch, params.id]);

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
            {voice.name} {voice.description ? `- ${voice.description}` : ''}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 