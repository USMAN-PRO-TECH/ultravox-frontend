'use client'

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, Phone } from 'lucide-react'
import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { startCall, endCall } from '@/lib/callFunctions'
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { Role, Transcript, UltravoxExperimentalMessageEvent, UltravoxSessionStatus } from 'ultravox-client'
import demoConfig from '@/app/demo-config'
import { assistantService } from "../../src/services/assistantService"


interface TestSectionProps {
  params: {
    id: string;
  };
}

export function TestSection({ params }: TestSectionProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [agentStatus, setAgentStatus] = useState<string>('off')
  const [callTranscript, setCallTranscript] = useState<Transcript[] | null>([])
  const { voices, loading, error } = useSelector((state: RootState) => state.voices);

  const [callDebugMessages, setCallDebugMessages] = useState<UltravoxExperimentalMessageEvent[]>([])

  const handleStatusChange = useCallback((status: UltravoxSessionStatus | string | undefined) => {
    if(status) {
      setAgentStatus(status)
    } else {
      setAgentStatus('off')
    }
  }, [])

  const handleTranscriptChange = useCallback((transcripts: Transcript[] | undefined) => {
    if(transcripts) {
      setCallTranscript([...transcripts])
    }
  }, [])

  const handleDebugMessage = useCallback((debugMessage: UltravoxExperimentalMessageEvent) => {
    setCallDebugMessages(prevMessages => [...prevMessages, debugMessage])
  }, [])

  const handleStartCall = async () => {
    try {
      const updatedAssistant = await assistantService.getAssistant(params.id)
      const realConfig = {
        title: updatedAssistant.data.name,
        overview: updatedAssistant.data.firstMessage,
        callConfig: {
          systemPrompt: updatedAssistant.data.content,
          model: "fixie-ai/ultravox-70B",
          languageHint: updatedAssistant.data.language || "en",
          voice: updatedAssistant.data.provider || "Mark",
          temperature: 0.4
        }
      };
      console.log(realConfig)
      handleStatusChange('Starting call...')
      setCallTranscript(null)
      setCallDebugMessages([])

      const callConfig = {
        ...realConfig.callConfig,
        callId: `test-${Date.now()}`
      }

      await startCall({
        onStatusChange: handleStatusChange,
        onTranscriptChange: handleTranscriptChange,
        onDebugMessage: handleDebugMessage
      }, callConfig)

      setIsRecording(true)
      handleStatusChange('Call started successfully')
    } catch (error) {
      handleStatusChange(`Error starting call: ${error instanceof Error ? error.message : String(error)}`)
      setIsRecording(false)
    }
  }

  const handleEndCall = async () => {
    try {
      handleStatusChange('Ending call...')
      await endCall()
      setIsRecording(false)
      handleStatusChange('Call ended successfully')
    } catch (error) {
      handleStatusChange(`Error ending call: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleRecordingToggle = () => {
    if (isRecording) {
      handleEndCall()
    } else {
      handleStartCall()
    }
  }

  return (
    <div className="h-full bg-white">
      <Tabs defaultValue="test" className="h-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger 
            value="test" 
            className="rounded-none border-b border-[#E5E7EB] data-[state=active]:border-[#2563EB] data-[state=active]:border-b-2 data-[state=active]:shadow-none flex items-center gap-2"
          >
            <Phone className="h-4 w-4" />
            Test Audio
          </TabsTrigger>
          <TabsTrigger 
            value="variables"
            className="rounded-none border-b border-[#E5E7EB] data-[state=active]:border-[#2563EB] data-[state=active]:border-b-2 data-[state=active]:shadow-none"
          >
            Variables
          </TabsTrigger>
        </TabsList>
        <TabsContent value="test" className="px-4 py-4">
          {!isRecording ? (
            // Initial view before call starts
            <div className="space-y-8 text-center py-4">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
                  <Mic className="h-8 w-8 text-gray-400" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xl font-semibold text-[#111827]">Test your agent</h3>
                  <p className="text-sm text-[#6B7280]">
                    Start a conversation with your AI assistant
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={handleRecordingToggle}
                className="w-full h-11 text-white rounded-md transition-colors bg-[#18181B] hover:bg-[#18181B]/90"
              >
                <Mic className="mr-2 h-5 w-5" />
                Start Test
              </Button>
            </div>
          ) : (
            // Call in progress view
            <div className="flex flex-col h-[500px]">
              <div className="flex-grow overflow-y-auto">
                {callTranscript && callTranscript.map((transcript, index) => (
                  <div
                    key={index}
                    className={cn(
                      "mb-4 max-w-[85%]",
                      transcript.speaker === "agent" ? "ml-0" : "ml-auto"
                    )}
                  >
                    <div
                      className={cn(
                        "p-3 rounded-lg",
                        transcript.speaker === "agent" 
                          ? "bg-gray-100" 
                          : "bg-black text-white"
                      )}
                    >
                      {transcript.text}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Status Message */}
              {agentStatus !== 'off' && (
                <div className="text-sm text-gray-500 text-center my-2">
                  {agentStatus}
                </div>
              )}

              {/* End Call Button */}
              <Button 
                onClick={handleRecordingToggle}
                className="w-full h-11 text-white rounded-md transition-colors bg-red-500 hover:bg-red-600 mt-4"
              >
                End the Call
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="variables" className="p-8">
          <p className="text-sm text-[#6B7280]">No variables configured</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

