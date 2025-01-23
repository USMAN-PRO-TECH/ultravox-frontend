import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { FileText } from 'lucide-react'
import { assistantService } from "../../src/services/assistantService"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { showToast } from '@/lib/toast';
import { toast } from 'react-hot-toast';

export function InstructionsForm() {
  const params = useParams()
  const [content, setContent] = useState<string>("")
  const [firstMessage, setFirstMessage] = useState<string>("Hello, How can I assist you today?")
  const [assistant, setAssistant] = useState<any>(null)

  // Fetch initial data
  useEffect(() => {
    const fetchAssistant = async () => {
      const {data} = await assistantService.getAssistant(params.id.toString())
      
      setContent(data.content || "")
      setFirstMessage(data.firstMessage || "Hello, How can I assist you today?")
      setAssistant(data)
    }
    fetchAssistant()
  }, [params.id])

  const updateInstructions = async () => {
    const loadingToast = showToast.loading("Saving changes...");
    try {
      console.log(params.id.toString());
      await assistantService.updateAssistant(params.id.toString(), {
        content,
        firstMessage
      });
      const updatedAssistant = await assistantService.getAssistant(params.id.toString());
      setContent(updatedAssistant.data.content);
      setFirstMessage(updatedAssistant.data.firstMessage);
      toast.dismiss(loadingToast);
      showToast.success("Instructions updated successfully");
    } catch (error) {
      toast.dismiss(loadingToast);
      showToast.error("Failed to update instructions");
      console.error("Error updating instructions:", error);
    }
  };

  return (
    <div className="space-y-5 max-w-full hidden">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Instructions for your AI Assistant</h2>
        <p className="text-sm text-muted-foreground">
          Write them yourself, or use one of these instruction templates to start:
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <Select>
          <SelectTrigger className="w-[600px] h-10 border-white">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="customer-service">Customer Service</SelectItem>
            <SelectItem value="education">Education</SelectItem>
          </SelectContent>
        </Select>

        {/* <Button 
          variant="outline" 
          className="flex items-center gap-2 px-4 h-10 whitespace-nowrap"
        >
          <FileText className="h-4 w-4" />
          Prompt Guideline
        </Button> */}
      </div>

      <div className="space-y-4">
        {/* <div className="space-y-2">
          <Label className="text-[15px] font-medium text-foreground">
            First Sentence
          </Label>
          <Input
            placeholder="Enter first sentence"
            value={firstMessage}
            onChange={(e) => setFirstMessage(e.target.value)}
            className="h-10"
          />
        </div> */}

        <div className="space-y-2">
          <Label className="text-[15px] font-medium text-foreground">
            Instructions
          </Label>
          <Textarea
            className="min-h-[180px] resize-none leading-relaxed border-white"
            placeholder="Enter detailed instructions"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <Button onClick={updateInstructions} className="mt-4">
        Save Changes
      </Button>
    </div>
  )
}

