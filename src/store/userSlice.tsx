// store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

interface SessionState {
  token: string | null;
  user: User | null;
}

const initialState: SessionState = {
  token: null,
  user: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SessionState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      // Sincronizar con localStorage
      localStorage.setItem('sessionUser', JSON.stringify(state));
    },
    clearSession: (state) => {
      state.token = null;
      state.user = null;
      // Eliminar de localStorage
      localStorage.removeItem('sessionUser');
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;
