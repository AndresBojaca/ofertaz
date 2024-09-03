import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  date: string[];
  level: string[];
  company: string[];
  location: string[];
  skills: string[];
}

// Leer el estado inicial desde localStorage
const getInitialState = (): FiltersState => {
  if (typeof window !== 'undefined') {  // Verificar si está en el navegador
    const sessionUser = localStorage.getItem('filters');
    if (sessionUser) {
      return JSON.parse(sessionUser);
    }
  }
  return {
    date: [],
    level: [],
    company: [],
    location: [],
    skills: [],
  };
};

// Guardar el estado en localStorage
const saveStateToLocalStorage = (state: FiltersState) => {
  if (typeof window !== 'undefined') {  // Verificar si está en el navegador
    localStorage.setItem('filters', JSON.stringify(state));
  }
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: getInitialState(),
  reducers: {
    addFilter: (
      state,
      action: PayloadAction<{ filterType: keyof FiltersState; value: string }>
    ) => {
      const { filterType, value } = action.payload;
      const index = state[filterType].indexOf(value);

      if (index > -1) {
        state[filterType].splice(index, 1);  // Quitar el valor si ya está
      } else {
        state[filterType].push(value);  // Agregar el valor si no está
      }

      saveStateToLocalStorage(state);  // Guardar el estado actualizado
    },
    removeFilter: (
      state,
      action: PayloadAction<{ filterType: keyof FiltersState; value: string }>
    ) => {
      const { filterType, value } = action.payload;
      const index = state[filterType].indexOf(value);
      if (index > -1) {
        state[filterType].splice(index, 1);
      }
      saveStateToLocalStorage(state);  // Guardar el estado actualizado
    },
    removeAllFilters: (state) => {
      // Reiniciar todos los filtros
      Object.keys(state).forEach((key) => {
        state[key as keyof FiltersState] = [];
      });
      saveStateToLocalStorage(state);  // Guardar el estado actualizado
    },
  },
});

export const { addFilter, removeFilter, removeAllFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
