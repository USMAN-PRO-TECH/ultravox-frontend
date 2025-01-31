import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "next/navigation"
import { fetchVoiceList } from "../../store/actions/voiceActions"
import { AppDispatch, RootState } from "../../store/store"
import { assistantService } from "../../src/services/assistantService"
import { showToast } from '@/lib/toast';
import { Skeleton } from "../ui/skeleton"
import { toast } from 'react-hot-toast';
import { Avatar, AvatarImage } from "../ui/avatar"

export function VoiceSelectorButtons({setSelectedVoice, selectedVoice}: {setSelectedVoice: (voice: string) => void, selectedVoice: string}) {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { voices, loading, error } = useSelector((state: RootState) => state.voices);
  const [currentVoice, setCurrentVoice] = useState<string>(selectedVoice);

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
//   useEffect(() => {
//     dispatch(fetchVoiceList());
//     // Fetch current assistant voice
//     const fetchCurrentVoice = async () => {
//       try {
//         const assistant = await assistantService.getAssistant(params.id.toString());
//         if (assistant.data.providerId) {
//           setCurrentVoice(assistant.data.providerId);
//         }
//       } catch (error) {
//         console.error("Error fetching current voice:", error);
//       }
//     };
//     fetchCurrentVoice();
//   }, [dispatch, params.id]);

  useMemo(() => { 
    console.log(selectedVoice);
      setCurrentVoice(selectedVoice); 
  }, [selectedVoice])

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
        setCurrentVoice(selectedVoice.voiceId as string);
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
    <div className="w-[60%]">
    {voices.reduce<{ voiceId: string; name: string }[][]>((rows, voice, index) => {
      if (index % 2 === 0) {
        rows.push([voice]);
      } else {
        rows[rows.length - 1].push(voice);
      }
      return rows;
    }, []).map((pair, rowIndex) => (
      <div key={rowIndex} className="flex items-center">
        {pair.map((voice: { voiceId: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
          <button
            key={voice.voiceId}
            className={`h-12 w-1/2 m-2 px-4 rounded-md text-white transition-colors flex items-center justify-center gap-2 ${
              currentVoice === voice.voiceId ? 'bg-purple-400' : 'bg-purple-900 hover:bg-gray-400'
            }`}
            onClick={() => handleVoiceChange(voice.voiceId as string)}
          > 
              <Avatar className="h-10 w-10">
                <AvatarImage src={getVoiceImage(voice.name as string)} />
              </Avatar>
              <span>{getVoiceName(voice.name as string)}</span> 
          </button>
        ))}
      </div>
    ))}
  </div>
  );
}
