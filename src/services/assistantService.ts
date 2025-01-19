import { apiService } from './api';
import { Assistant, CreateAssistantDto, UpdateAssistantDto } from '../store/types/assistant';

export class AssistantService {
  private readonly baseUrl = '/api/v1/voices/voices';

  async getAssistants(params?: { page: number; limit: number; search?: string }) {
    return apiService.get<{ data: Assistant[]; total: number }>(this.baseUrl, { params });
  }

  async getAssistant(id: string) {
    const response = await apiService.get<{ data: Assistant }>(`${this.baseUrl}/${id}`);
    return response;
  }

  async createAssistant(data: CreateAssistantDto) {
    return apiService.post<Assistant>(this.baseUrl, data);
  }

  async updateAssistant(id: string, data: UpdateAssistantDto) {
    return apiService.put<Assistant>(`${this.baseUrl}/${id}`, data);
  }

  async deleteAssistant(id: string) {
    return apiService.delete<void>(`${this.baseUrl}/${id}`);
  }
}

export const assistantService = new AssistantService(); 