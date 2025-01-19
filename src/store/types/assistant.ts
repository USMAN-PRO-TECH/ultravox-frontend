export interface AssistantState {
  assistants: Assistant[];
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  itemsPerPage: number;
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
  language?: string; // Ensure this exists here
  providerId?: string;
  calls: number;
}

export interface CreateAssistantDto {
  name: string;
  description: string;
  model: string;
  provider?: string;
  providerId?: string;
  content: string;
  firstMessage: string;
  language?: string; // Ensure this exists here
}

export interface UpdateAssistantDto extends Partial<CreateAssistantDto> {} 