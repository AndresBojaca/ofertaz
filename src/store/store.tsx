// store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './userSlice';
import filtersReducer from './filterSlice';

// Configurar el store con los reducers
const store = configureStore({
  reducer: {
    session: sessionReducer,
    filters: filtersReducer,
  },
});

// Tipos exportados para uso en componentes
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
