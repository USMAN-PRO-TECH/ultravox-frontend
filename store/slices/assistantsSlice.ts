import { createSlice } from '@reduxjs/toolkit';
import { fetchAssistants } from '../actions/assistantActions';
import type { Assistant } from '../types/assistant';

interface AssistantsState {
  assistants: Assistant[];
  loading: boolean;
  error: string | null;
}

const initialState: AssistantsState = {
  assistants: [],
  loading: false,
  error: null,
};

const assistantsSlice = createSlice({
  name: 'assistants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssistants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssistants.fulfilled, (state, action) => {
        state.loading = false;
        state.assistants = action.payload;
        console.log('Assistants loaded:', action.payload);
      })
      .addCase(fetchAssistants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assistants';
      });
  },
});

export default assistantsSlice.reducer; 