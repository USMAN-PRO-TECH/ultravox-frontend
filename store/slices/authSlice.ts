import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';
import { showToast } from '@/lib/toast';
import toast from 'react-hot-toast';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    const loadingToast = showToast.loading('Logging in...');
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { token, user } = response.data.data;
      
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      showToast.success('Successfully logged in!');
      return { user };
    } catch (error) {
      showToast.error(typeof error === 'string' ? error : 'Login failed');
      return rejectWithValue(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
  return null;
});

export const initializeAuth = createAsyncThunk('auth/initialize', async () => {
  try {
    const token = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      const userData = JSON.parse(savedUser);
      if (userData) {
        return { user: userData };
      }
    }
    throw new Error('No valid auth data');
  } catch (error) {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    return { user: null };
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = !!action.payload.user;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer; 