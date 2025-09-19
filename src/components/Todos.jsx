import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiTwotoneDelete } from "react-icons/ai";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import { deleteTodo } from '../features/todo/todoSlice'
import Delete from './Delete';

function Todos() {
  const todos = useSelector((state) => state.todos)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [select, setSelect] = useState(null)
  const [animatingItems, setAnimatingItems] = useState(new Set())
  const [deletingId, setDeletingId] = useState(null)

  console.log(todos);

  const HandleClick = (todo) => {
    setSelect(todo)
    setIsOpen(true)
  }

  const handleToggleComplete = (todo) => {
    setAnimatingItems(prev => new Set(prev).add(todo.id))
    setTimeout(() => {
      dispatch(toggleTodo(todo.id))
      setAnimatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(todo.id)
        return newSet
      })
    }, 200)
  }

  const handleDeleteClick = (todo) => {
    setDeletingId(todo.id)
    setTimeout(() => HandleClick(todo), 150)
  }

  return (
    <div className="flex justify-center mt-4 sm:mt-6 px-4 sm:px-0">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
            Your Tasks
          </h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            {todos.length} {todos.length === 1 ? 'task' : 'tasks'} total
          </p>
        </div>

        {/* Todo Container */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {todos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <div className="text-6xl mb-4 animate-bounce">📝</div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No tasks yet</h3>
              <p className="text-gray-400 text-center">Add a new task to get started!</p>
            </div>
          ) : (
            <div className="max-h-[60vh] sm:max-h-[400px] overflow-y-auto custom-scrollbar">
              <ul className="divide-y divide-gray-100">
                {todos.map((todo, index) => (
                  <li
                    key={todo.id}
                    className={`
                      flex items-center gap-3 px-4 sm:px-6 py-4
                      transition-all duration-300 ease-in-out
                      hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50
                      transform hover:scale-[1.01]
                      animate-slide-in
                      ${deletingId === todo.id ? 'animate-pulse bg-red-50' : ''}
                      ${animatingItems.has(todo.id) ? 'animate-bounce-small' : ''}
                      ${todo.completed ? 'bg-green-50' : ''}
                    `}
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    {/* Completion Toggle */}
                    <button
                      onClick={() => handleToggleComplete(todo)}
                      className={`
                        flex-shrink-0 p-1 rounded-full transition-all duration-200
                        hover:bg-white hover:shadow-md transform hover:scale-110
                        ${todo.completed ? 'text-green-500' : 'text-gray-400 hover:text-green-500'}
                      `}
                      title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {todo.completed ? (
                        <FiCheckCircle size={20} className="animate-scale-in" />
                      ) : (
                        <FiCircle size={20} />
                      )}
                    </button>

                    {/* Todo Content */}
                    <div className={`
                      flex-1 min-w-0 transition-all duration-300
                      ${todo.completed ? 'opacity-60' : ''}
                    `}>
                      <h3 className={`
                        text-base sm:text-lg font-semibold mb-1
                        transition-all duration-300
                        ${todo.completed 
                          ? 'line-through text-gray-500' 
                          : 'text-gray-800 group-hover:text-purple-700'
                        }
                        truncate
                      `}>
                        {todo.title}
                      </h3>
                      <p className={`
                        text-sm font-medium
                        transition-all duration-300
                        ${todo.completed 
                          ? 'line-through text-gray-400' 
                          : 'text-gray-600'
                        }
                        line-clamp-2
                      `}>
                        {todo.description}
                      </p>
                      
                      {/* Creation time */}
                      {todo.createdAt && (
                        <p className="text-xs text-gray-400 mt-1">
                          Added {new Date(todo.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    {/* Delete Button */}
                    <button
                      className={`
                        flex-shrink-0 p-2 rounded-full hover:cursor-pointer
                        text-gray-400 hover:text-red-500 hover:bg-red-50
                        transition-all duration-200 ease-in-out
                        transform hover:scale-110 active:scale-95
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1
                        ${deletingId === todo.id ? 'animate-spin text-red-500' : ''}
                      `}
                      onClick={() => handleDeleteClick(todo)}
                      title="Delete Task"
                    >
                      <AiTwotoneDelete size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        {todos.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Completed: {todos.filter(t => t.completed).length}</span>
              <span>Pending: {todos.filter(t => !t.completed).length}</span>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <Delete 
        isOpen={isOpen} 
        setIs={setIsOpen} 
        remove={deleteTodo} 
        todo={select}
        onClose={() => setDeletingId(null)}
      />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scale-in {
          from {
            transform: scale(0.5);
          }
          to {
            transform: scale(1);
          }
        }
        
        @keyframes bounce-small {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .animate-bounce-small {
          animation: bounce-small 0.5s ease-in-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default Todos