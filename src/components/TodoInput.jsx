import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'

function TodoInput() {
  const { register, handleSubmit, reset } = useForm()
  const dispatch = useDispatch()

  const HandleData = (data) => {
    dispatch(addTodo({ title: data.title, description: data.description }))
    reset()
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(HandleData)}
        className="flex flex-col gap-9"
      >
        <input
          {...register('title', { required: true })}
          className="h-12 w-90 border-2 placeholder:font-bold pl-3 rounded-sm border-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          placeholder="Title"
        />

        <input
          {...register('description', { required: true })}
          className="h-12 w-90 border-2 placeholder:font-bold pl-3 rounded-sm border-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          placeholder="Description"
        />

        <button
          type="submit"
          className="h-12 w-90 border-2 border-gray-400 rounded-md hover:cursor-pointer font-bold hover:bg-gray-300"
        >
          Add Task
        </button>
      </form>
    </div>
  )
}

export default TodoInput
