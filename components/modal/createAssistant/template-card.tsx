'use client';

import { useAppDispatch } from '@/store/hooks';
import { createAssistant } from '@/store/actions/assistantActions';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import type { Template } from "@/lib/types/template"
import { showToast } from '@/lib/toast';
import { toast } from 'react-hot-toast';

interface TemplateCardProps {
  template: Template
  onViewDetails?: (id: string) => void
  onOpenChange: (open: boolean) => void
}

export function TemplateCard({ template, onViewDetails = () => {}, onOpenChange }: TemplateCardProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCreate = async () => {
    const loadingToast = showToast.loading("Creating assistant...");
    try {
      const result = await dispatch(createAssistant(template)).unwrap();
      if (result._id) {
        toast.dismiss(loadingToast);
        showToast.success("Assistant created successfully");
        router.push(`/assistants/${result._id}`);
      }
      onOpenChange(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      showToast.error("Failed to create assistant");
      console.error('Failed to create assistant:', error);
    }
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start gap-3 mb-4">
        <Avatar>
          <AvatarImage src={template.avatar} alt={template.name} />
          <AvatarFallback>{template.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{template.name}</h3>
          <p className="text-sm text-muted-foreground">{template.category}</p>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={() => onViewDetails(template.id)}>
          View Details
        </Button>
        <Button onClick={handleCreate}>
          Create
        </Button>
      </div>
    </div>
  );
}

