import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { assistantService } from '@/services/assistantService';
import { Template } from '@/lib/types/template';
import { UpdateAssistantDto } from '@/store/types/assistant';
export const removeAssistant = createAction<string>('assistants/removeAssistant');

export const fetchAssistants = createAsyncThunk(
  'assistants/fetchAssistants',
  async (_, { rejectWithValue }) => {
    try {
      const response = await assistantService.getAssistants();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch assistants');
    }
  }
);

export const createAssistant = createAsyncThunk(
  'assistants/createAssistant',
  async (template: Template, { rejectWithValue }) => {
    try {
      const response = await assistantService.createAssistant(template);
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
      const response = await assistantService.deleteAssistant(id);

      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete assistant');
    }
  }
);

export const fetchAssistant = createAsyncThunk(
  'assistants/fetchAssistant',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await assistantService.getAssistant(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch assistant');
    }
  }
); 