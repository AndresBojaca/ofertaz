import { configureStore } from '@reduxjs/toolkit'
import tagsReducer from '../features/tags/tagsSlice'

export const store = configureStore({
    reducer: {
        tags: tagsReducer
    }
})
