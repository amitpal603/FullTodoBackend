import {configureStore,applyMiddleware} from '@reduxjs/toolkit'
import TodoReducer from '../features/todo/todoSlice'
import { thunk } from 'redux-thunk'


export const Store = configureStore({
   reducer:{
    todos : TodoReducer
   } ,
    middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware()
  ]

})