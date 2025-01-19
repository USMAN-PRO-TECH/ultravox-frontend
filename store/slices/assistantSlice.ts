import { createSlice } from '@reduxjs/toolkit';
import { AssistantState } from '@/store/types/assistant';
import { createAssistant, fetchAssistants, fetchAssistant } from '../actions/assistantActions';

const initialState: AssistantState = {
  assistants: [],
  currentAssistant: null,
  loading: false,
  error: null,
  voices: [],
  total: 0,
  currentPage: 1,
  itemsPerPage: 10
};

const assistantSlice = createSlice({
  name: 'assistants',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Assistants
      .addCase(fetchAssistants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssistants.fulfilled, (state, action) => {
        state.loading = false;
        state.assistants = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAssistants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.assistants = [];
      })
      // Fetch Single Assistant
      .addCase(fetchAssistant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssistant.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAssistant = action.payload.data;
      })
      .addCase(fetchAssistant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.currentAssistant = null;
      })
      // Create Assistant
      .addCase(createAssistant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAssistant.fulfilled, (state, action) => {
        state.loading = false;
        state.voices = [action.payload];
      })
      .addCase(createAssistant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = assistantSlice.actions;
export default assistantSlice.reducer; 