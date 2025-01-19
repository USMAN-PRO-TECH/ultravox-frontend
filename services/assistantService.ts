import { apiService } from './api';
import type { Assistant, CreateAssistantDto } from '../store/types/assistant';
import { Template } from '@/lib/types/template';

const BASE_URL = '/api/v1/voices';

export const assistantService = {
  async getAssistants() {
    const response = await apiService.get<{ success: boolean; data: Assistant[] }>(`${BASE_URL}/voices`);
    return response.data || [];
  },

  async getAssistant(id: string) {
    try {
      const response = await apiService.get<{ success: boolean; data: Assistant }>(`${BASE_URL}/voices/${id}`);

      
      if (!response.success) {
        throw new Error('Failed to fetch assistant details');
      }
      
      return response; // Return the full response object
    } catch (error) {
      console.error('Error in getAssistant:', error);
      throw error;
    }
  },

  async createAssistant(template: Template) {
    const payload = {
      template: {
        id: template.id,
        name: template.name,
        category: template.category,
        type: template.type,
        avatar: template.avatar,
      },
      assistant: {
        name: `${template.name} Assistant`,
        description: `Created from ${template.name} template`,
        model: template.type,
        category: template.category,
        status: 'Active',
        voice: template.name,
        calls: 0
      }
    };

    const response = await apiService.post<{ success: boolean; data: Assistant }>(`${BASE_URL}/voices`, payload);
    return response.data;
  },

  async updateAssistant(id: string, data: Partial<{ content: string; firstMessage: string; language: string }>) {
    const response = await fetch(`${BASE_URL}/voices/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update assistant');
    return response.json();
  },

  async deleteAssistant(id: string) {
    const response = await apiService.delete<{ success: boolean; message: string }>(`${BASE_URL}/voices/${id}`);
    if (response.success) {
      return id; // Just return the id
    }
    throw new Error('Failed to delete assistant');
  },

  async getVoices() {
    const response = await apiService.get<{ success: boolean; data: any[] }>(`${BASE_URL}/voices`);
    return response.data;
  },

  async createAssistantFromTemplate(templateId: string, data: CreateAssistantDto) {
    const response = await apiService.post<{ success: boolean; data: Assistant }>(`${BASE_URL}/template/${templateId}`, data);
    return response.data;
  },
}; 