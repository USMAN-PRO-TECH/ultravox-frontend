import { configureStore } from '@reduxjs/toolkit';
import assistantReducer from './slices/assistantSlice';
import voiceReducer from './slices/voiceSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    assistants: assistantReducer,
    voices: voiceReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 