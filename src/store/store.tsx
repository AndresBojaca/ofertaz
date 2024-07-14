import { configureStore } from '@reduxjs/toolkit'
import TagsSlice from './TagsSlice'

export const store = configureStore({
    reducer: {
        tags: TagsSlice
    }
})
