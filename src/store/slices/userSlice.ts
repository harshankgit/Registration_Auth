import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  user_id: number;
  name: string;
  email: string;
  number?: string;
  gender?: string;
  is_admin: number;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      // Store in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    initializeUser: (state) => {
      // Initialize user from localStorage
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          state.user = JSON.parse(storedUser);
          state.isAuthenticated = true;
        }
      }
    },
  },
});

export const { setUser, clearUser, setLoading, initializeUser } = userSlice.actions;
export default userSlice.reducer;