export interface Assistant {
  _id: string;
  name: string;
  description: string;
  model: string;
  created_at: string;
  status: string;
  phoneNumber?: string;
  content: string;
  firstMessage: string;
  voice: string;
  calls: number;
  language?: string;
  provider?: string;
  providerId?: string;
}

export interface CreateAssistantDto {
  name: string;
  description: string;
  model: string;
  category?: string;
  status?: string;
  voice?: string;
  language?: string;
  provider?: string;
  providerId?: string;
  calls?: number;
}

export interface UpdateAssistantDto {
  content?: string;
  firstMessage?: string;
  name?: string;
  description?: string;
  model?: string;
  category?: string;
  status?: string;
  voice?: string;
  calls?: number;
  language?: string;
  provider?: string;
  providerId?: string;
}

export interface AssistantState {
  assistants: Assistant[];
  currentAssistant: Assistant | null;
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  itemsPerPage: number;
  voices: any[];
} 