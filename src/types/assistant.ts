export interface CreateAssistantDto {
  name: string;
  description: string;
  model: string;
  provider?: string;
  providerId?: string;
  language?: string;
}

export interface UpdateAssistantDto {
  name?: string;
  description?: string;
  model?: string;
  content?: string;
  firstMessage?: string;
  voice?: string;
  provider?: string;
  providerId?: string;
  language?: string; // Ensure this exists here
}

export interface Assistant {
  id: string;
  name: string;
  description: string;
  model: string;
  created_at: string;
  content: string;
  firstMessage: string;
  status: string;
  phoneNumber?: string;
  voice: string;
  provider?: string;
  providerId?: string;
  calls: number;
  language?: string; // Ensure this exists here
} 