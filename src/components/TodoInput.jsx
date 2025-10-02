import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addTodo,fetchTodos } from '../features/todo/todoSlice'

function TodoInput() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const HandleData = async (data) => {
    setIsSubmitting(true)
    
    // Add a slight delay for animation effect
    await new Promise(resolve => setTimeout(resolve, 300))
    
    dispatch(addTodo({ 
      title: data.title, 
      description: data.description,
      id: Date.now(), // Add unique ID
      completed: false,
      createdAt: new Date().toISOString()
    }))
    
    reset()
    setIsSubmitting(false)
  }
   useEffect(() => {
      dispatch(fetchTodos())
   },[])

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6">
      <form
        onSubmit={handleSubmit(HandleData)}
        className="space-y-4 sm:space-y-6"
      >
        {/* Title Input */}
        <div className="relative group">
          <input
            {...register('title', { 
              required: 'Title is required',
              minLength: { value: 2, message: 'Title must be at least 2 characters' }
            })}
            className={`
              w-full h-12 px-4 border-2 rounded-lg
              placeholder:font-medium placeholder:text-gray-400
              bg-white transition-all duration-300 ease-in-out
              outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
              hover:border-gray-500 hover:shadow-sm
              ${errors.title ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
              transform hover:scale-[1.02] focus:scale-[1.02]
            `}
            type="text"
            placeholder="Enter task title..."
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1 animate-fade-in">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description Input */}
        <div className="relative group">
          <textarea
            {...register('description', { 
              required: 'Description is required',
              minLength: { value: 5, message: 'Description must be at least 5 characters' }
            })}
            className={`
              w-full h-24 sm:h-20 px-4 py-3 border-2 rounded-lg resize-none
              placeholder:font-medium placeholder:text-gray-400
              bg-white transition-all duration-300 ease-in-out
              outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
              hover:border-gray-500 hover:shadow-sm
              ${errors.description ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
              transform hover:scale-[1.02] focus:scale-[1.02]
            `}
            placeholder="Enter task description..."
            disabled={isSubmitting}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1 animate-fade-in">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full h-12 rounded-lg font-semibold
            transition-all duration-300 ease-in-out
            transform hover:scale-[1.02] active:scale-[0.98]
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
            ${isSubmitting 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white hover:shadow-lg'
            }
          `}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Adding Task...</span>
            </div>
          ) : (
            'Add Task'
          )}
        </button>
      </form>

      {/* Custom CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
   
  )
}

export default TodoInput;