import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: null | { id: number; name: string; email: string; role: number };
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: AuthState['user']; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem('auth', JSON.stringify(action.payload));
    },
      clear(state) {
      state.user = null;
      state.token = null;

      localStorage.removeItem('auth');
    },
  },
});

export const { setCredentials, clear } = authSlice.actions;
export default authSlice.reducer;

