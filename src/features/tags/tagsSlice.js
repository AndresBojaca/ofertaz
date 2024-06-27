import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTag: (state, action) => {
      if (!state.includes(action.payload)) {
        const array = localStorage.getItem("tags");
        let tags = [];

        if (array) {
          // Si el ls no viene vacio
          tags = JSON.parse(array); // Parsea los tags
        }
        if (!array?.includes(action.payload)) {
          // Si no hay un tag en el storage con el mismo nombre
          tags.push(action.payload);
        }
        localStorage.setItem("tags", JSON.stringify(tags));
        // Push Store
        state.push(action.payload);
      }
    },
    removeTag: (state, action) => {
      const array = localStorage.getItem("tags");
      let tags = [];
      if (array) {
        tags = JSON.parse(array);
      }
      tags.pop(action.payload);
      localStorage.setItem("tags", JSON.stringify(tags));
      // Pop Store
      state.pop(action.payload);
    },
    removeallTags: () => {
      let tags = [];
      localStorage.setItem("tags", JSON.stringify(tags)); //Vacía el LS
      return []; //Retorna Vacío para actualizar el Store
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTag, removeTag, removeallTags } = tagSlice.actions;

export default tagSlice.reducer;
