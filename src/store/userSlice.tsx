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
  role: 'Admin' | 'User' | 'Company' | null;
  isAuthenticated: boolean;
}

// Leer el estado inicial desde localStorage
const getInitialState = (): SessionState => {
  const sessionUser = localStorage.getItem('sessionUser');
  if (sessionUser) {
    return JSON.parse(sessionUser);
  }
  return {
    token: null,
    user: null,
    role: null,
    isAuthenticated: false,
  };
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: getInitialState(),
  reducers: {
    setSession: (state, action: PayloadAction<SessionState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      // Sincronizar con localStorage
      localStorage.setItem('sessionUser', JSON.stringify(state));
    },
    clearSession: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      // Eliminar de localStorage
      localStorage.removeItem('sessionUser');
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;
