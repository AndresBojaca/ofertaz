// store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './userSlice';
import tagsReducer from './TagsSlice';

// Configurar el store con los reducers
const store = configureStore({
  reducer: {
    session: sessionReducer,
    tags: tagsReducer,
  },
});

// Tipos exportados para uso en componentes
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
