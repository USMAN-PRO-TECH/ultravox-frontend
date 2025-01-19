import { createSlice } from '@reduxjs/toolkit';
import { AssistantState } from '../types/assistant';
import { fetchAssistants, createAssistant, updateAssistant, deleteAssistant } from '../actions/assistantActions';

const initialState: AssistantState = {
  assistants: [],
  loading: false,
  error: null,
  total: 0,
  currentPage: 1,
  itemsPerPage: 10,
};

const assistantSlice = createSlice({
  name: 'assistants',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Assistants
    builder
      .addCase(fetchAssistants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssistants.fulfilled, (state, action) => {
        state.loading = false;
        state.assistants = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchAssistants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Assistant
    builder
      .addCase(createAssistant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAssistant.fulfilled, (state, action) => {
        state.loading = false;
        state.assistants.unshift(action.payload);
      })
      .addCase(createAssistant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Assistant
    builder
      .addCase(updateAssistant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAssistant.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.assistants.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.assistants[index] = action.payload;
        }
      })
      .addCase(updateAssistant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Assistant
    builder
      .addCase(deleteAssistant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAssistant.fulfilled, (state, action) => {
        state.loading = false;
        state.assistants = state.assistants.filter((a) => a.id !== action.payload);
      })
      .addCase(deleteAssistant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentPage } = assistantSlice.actions;
export default assistantSlice.reducer; 