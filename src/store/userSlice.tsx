import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  confirmed: string;
  createdAt: string;
  updatedAt: string;
}

interface SessionState {
  token: string | null;
  user: User | null;
  role: 'Admin' | 'User' | 'Company' | null;
  isAuthenticated: boolean;
  isConfirmed: boolean;
}

// Leer el estado inicial desde localStorage
const getInitialState = (): SessionState => {
  if (typeof window !== 'undefined') {  // Verificar si está en el navegador
    const sessionUser = localStorage.getItem('sessionUser');
    if (sessionUser) {
      return JSON.parse(sessionUser);
    }
  }
  return {
    token: null,
    user: null,
    role: null,
    isAuthenticated: false,
    isConfirmed: false,
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
      state.isConfirmed = action.payload.user?.confirmed ? true : false;
      // Sincronizar con localStorage
      localStorage.setItem('sessionUser', JSON.stringify(state));
    },
    clearSession: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.isConfirmed = false;
      // Eliminar de localStorage
      localStorage.removeItem('sessionUser');
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;
