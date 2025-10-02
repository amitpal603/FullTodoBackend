import { nanoid, createSlice } from '@reduxjs/toolkit'
import {FETCH_TODOS_REQUEST,FETCH_TODOS_SUCCESS,FETCH_TODOS_FAILURE} from './action'

const initialState = {
    todos: []    
}

export const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                title: action.payload.title,
                description: action.payload.description,
                completed: false, // Fixed typo: was 'complete', now 'completed'
                createdAt: new Date().toISOString(), // Added timestamp
                updatedAt: new Date().toISOString()
            }
            state.todos.push(todo)
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
                todo.updatedAt = new Date().toISOString() // Track when it was last updated
            }
        },
        // Bonus: Additional useful reducers
        updateTodo: (state, action) => {
            const { id, title, description } = action.payload
            const todo = state.todos.find(todo => todo.id === id)
            if (todo) {
                if (title !== undefined) todo.title = title
                if (description !== undefined) todo.description = description
                todo.updatedAt = new Date().toISOString()
            }
        },
        clearCompleted: (state) => {
            state.todos = state.todos.filter(todo => !todo.completed)
        },
        markAllComplete: (state) => {
            const timestamp = new Date().toISOString()
            state.todos.forEach(todo => {
                todo.completed = true
                todo.updatedAt = timestamp
            })
        },
        markAllIncomplete: (state) => {
            const timestamp = new Date().toISOString()
            state.todos.forEach(todo => {
                todo.completed = false
                todo.updatedAt = timestamp
            })
        }
    }
})

 export const fetchTodos = () => {
    return async(dispatch) => {
        
        try {
            const res = await fetch('http://localhost:3000/api/todo')
            const data  = await res.json()

            dispatch(addTodo({
                payload : data
            }))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const { 
    addTodo, 
    deleteTodo, 
    toggleTodo,
    updateTodo,
    clearCompleted,
    markAllComplete,
} = TodoSlice.actions

export default TodoSlice.reducer