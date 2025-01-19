'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAssistant } from '@/store/actions/assistantActions';
import { NavBar } from "@/components/assistants/nav-bar"
import { AssistantName } from "@/components/assistants/assistant-name"
import { VoiceLanguageSelector } from "@/components/assistants/voice-language-selector"
import { InstructionsForm } from "@/components/assistants/instructions-form"
import { TestSection } from "@/components/assistants/test-section"

interface AssistantDetailsProps {
  id: string;
}

export function AssistantDetails({ id }: AssistantDetailsProps) {
  const dispatch = useAppDispatch();
  const { currentAssistant, loading, error } = useAppSelector((state) => state.assistants);

  useEffect(() => {
    if (id) {
      dispatch(fetchAssistant(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentAssistant) {
    return <div>Assistant not found</div>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <NavBar activeTab="prompt" />
      <div className="flex-1 flex">
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="space-y-6">
              <AssistantName initialName={currentAssistant.name} />
              <VoiceLanguageSelector />
              <InstructionsForm />
            </div>
          </div>
        </div>
        <div className="w-[320px] border-l">
          <TestSection params={{ id: currentAssistant._id }} />
        </div>
      </div>
    </div>
  );
} 