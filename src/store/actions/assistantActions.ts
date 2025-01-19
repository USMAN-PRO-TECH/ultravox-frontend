import { createAsyncThunk } from '@reduxjs/toolkit';
import { assistantService } from '../../services/assistantService';
import { Assistant, CreateAssistantDto, UpdateAssistantDto } from '../types/assistant';

export const fetchAssistants = createAsyncThunk(
  'assistants/fetchAssistants',
  async (params: { page: number; limit: number; search?: string }, { rejectWithValue }) => {
    try {
      const response = await assistantService.getAssistants(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch assistants');
    }
  }
);

export const createAssistant = createAsyncThunk(
  'assistants/createAssistant',
  async (data: CreateAssistantDto, { rejectWithValue }) => {
    try {
      const response = await assistantService.createAssistant(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create assistant');
    }
  }
);

export const updateAssistant = createAsyncThunk(
  'assistants/updateAssistant',
  async ({ id, data }: { id: string; data: UpdateAssistantDto }, { rejectWithValue }) => {
    try {
      const response = await assistantService.updateAssistant(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update assistant');
    }
  }
);

export const deleteAssistant = createAsyncThunk(
  'assistants/deleteAssistant',
  async (id: string, { rejectWithValue }) => {
    try {
      await assistantService.deleteAssistant(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete assistant');
    }
  }
); 