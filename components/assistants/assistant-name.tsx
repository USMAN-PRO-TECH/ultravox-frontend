import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function AssistantName({ initialName }: { initialName: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="assistant-name">Assistant Name</Label>
      <Input 
        id="assistant-name"
        placeholder="Enter assistant name"
        defaultValue={initialName}
      />
    </div>
  )
}

