import {nanoid,createSlice} from '@reduxjs/toolkit'

const initialState = {
    todos: []    
}

export const TodoSlice = createSlice({
    name : 'todo',
    initialState,
    reducers:{
        addTodo: (state,action) => {
            const todo = {id: nanoid(),title:action.payload.title,description:action.payload.description,complete:false}
            state.todos.push(todo)
        },
        deleteTodo: (state,action) => {
            state.todos = state.todos.filter(toto => toto.id !== action.payload)
        }
    }
})

export const {addTodo,deleteTodo} = TodoSlice.actions
export  default TodoSlice.reducer
