import { createAsyncThunk } from '@reduxjs/toolkit';
import { voiceService } from '../../src/services/voiceService';

export const fetchVoiceList = createAsyncThunk(
  'voices/fetchVoiceList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await voiceService.getVoiceList();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch voice list');
    }
  }
); 