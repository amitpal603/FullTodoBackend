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
        }
    }
})

export const {addTodo} = TodoSlice.actions
export  default TodoSlice.reducer
