import { createSlice } from '@reduxjs/toolkit';
import { VoiceState } from '../../src/types/voice';
import { fetchVoiceList } from '../actions/voiceActions';

const initialState: VoiceState = {
  voices: [],
  loading: false,
  error: null,
};

const voiceSlice = createSlice({
  name: 'voices',
  initialState,
  reducers: {
    clearVoiceError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVoiceList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVoiceList.fulfilled, (state, action) => {
        state.loading = false;
        state.voices = action.payload.results;
      })
      .addCase(fetchVoiceList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.voices = [];
      });
  },
});

export const { clearVoiceError } = voiceSlice.actions;
export default voiceSlice.reducer; 