import { configureStore } from '@reduxjs/toolkit';
import assistantReducer from './slices/assistantSlice';

export const store = configureStore({
  reducer: {
    assistants: assistantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 