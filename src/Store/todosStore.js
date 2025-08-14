import {configureStore} from '@reduxjs/toolkit'
import TodoReducer from '../features/todo/todoSlice'

export const Store = configureStore({
    reducer:TodoReducer
})