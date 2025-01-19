export interface Voice {
  voiceId: string;
  name: string;
  description: string;
  language?: string;
  accent?: string;
  gender?: string;
  preview_url?: string;
  provider?: string;
  providerId?: string;
}

export interface VoiceListResponse {
  results: Voice[];
  total: number;
  next: string | null;
  previous: string | null;
}
                
export interface VoiceState {
  voices: Voice[];
  loading: boolean;
  error: string | null;
} 