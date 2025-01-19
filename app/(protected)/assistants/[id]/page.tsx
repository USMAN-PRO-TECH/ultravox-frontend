'use client';

import { NavBar } from "@/components/assistants/nav-bar"
import { AssistantName } from "@/components/assistants/assistant-name"
import { VoiceLanguageSelector } from "@/components/assistants/voice-language-selector"
import { InstructionsForm } from "@/components/assistants/instructions-form"
import { TestSection } from "@/components/assistants/test-section"
import { assistantService } from "@/services/assistantService"
import { notFound } from 'next/navigation'
import { Assistant } from "@/store/types/assistant"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Clock, Check } from 'lucide-react'

type ModelOption = {
  id: string;
  name: string;
  latency: number;
  badge?: {
    text: string;
    color: string;
  };
  isRecommended?: boolean;
};

const modelOptions: ModelOption[] = [
  {
    id: 'ultravox',
    name: 'Ultravox',
    latency: 200,
    badge: { text: 'New', color: 'bg-purple-500' }
  },
  {
    id: 'ultravox-70B',
    name: 'Ultravox 70B',
    latency: 300,
    badge: { text: 'Advanced', color: 'bg-orange-500' }
  },
  {
    id: 'ultravox-8B',
    name: 'Ultravox 8B',
    latency: 180,
    badge: { text: 'Fast', color: 'bg-green-500' }
  },
  {
    id: 'gpt4',
    name: 'GPT 4.0 Cluster',
    latency: 450,
    badge: { text: 'Recommended', color: 'bg-blue-500' },
    isRecommended: true
  },
  {
    id: 'gpt35',
    name: 'GPT 3.5 Turbo',
    latency: 150
  },

];

const ModelOptionContent = ({ option }: { option: ModelOption }) => (
  <div className="flex items-center justify-between w-full">
    <div className="flex items-center gap-1.5">
      <span>{option.name}</span>
      {option.isRecommended && <Check className="h-3.5 w-3.5" />}
      <div className="flex items-center gap-1 text-gray-500">
        <Clock className="h-3.5 w-3.5" />
        <span>{option.latency}ms</span>
      </div>
    </div>
    {option.badge && (
      <Badge className={`${option.badge.color} px-3 py-0.5 h-6`}>
        {option.badge.text}
      </Badge>
    )}
  </div>
);

export default function AIAssistantConfig({ params }: { params: { id: string } }) {
  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [selectedModel, setSelectedModel] = useState('gpt4');

  useEffect(() => {
    const getAssistant = async () => {
      try {
        const {data} = await assistantService.getAssistant(params.id);
        setAssistant(data);
      } catch (error: any) {
        console.error('Error loading assistant:', error);
        if (error.message.includes('404')) {
          notFound();
        }
        setError(error);
      }
    };
    getAssistant();
  }, [params.id]);

  if (error) throw error;
  if (!assistant) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full w-full">
      <NavBar activeTab="prompt"  />
      <div className="flex flex-1 h-full">
        <div className="flex-1 min-w-0 h-full">
          <div className="h-full p-6">
            <div className="space-y-6">
              <AssistantName initialName={assistant.name} />
              <Select 
                defaultValue="gpt4" 
                value={selectedModel} 
                onValueChange={setSelectedModel}
              >
                <SelectTrigger className="h-11 w-[340px]">
                  <ModelOptionContent option={modelOptions.find(m => m.id === selectedModel)!} />
                </SelectTrigger>
                <SelectContent>
                  {modelOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      <ModelOptionContent option={option} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <VoiceLanguageSelector 
               
              />
              <InstructionsForm 
           
              />
            </div>
          </div>
        </div>
        <div className="w-[320px] border-l bg-white">
          <div className="sticky top-0 h-full">
            <TestSection params={params} />
          </div>
        </div>
      </div>
    </div>
  );
}
