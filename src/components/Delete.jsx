import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createPortal } from 'react-dom'
import { AiOutlineWarning, AiOutlineClose } from 'react-icons/ai'
import { FiTrash2, FiX } from 'react-icons/fi'

function Delete({ isOpen, todo, setIs, remove, onClose }) {
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const model = document.getElementById('portal')

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    if (isDeleting) return // Prevent closing while deleting
    setIs(false)
    if (onClose) onClose()
  }

  const HandleDelete = async () => {
    setIsDeleting(true)
    
    // Add delay for animation effect
    setTimeout(() => {
      dispatch(remove(todo.id))
      setIsDeleting(false)
      setIs(false)
      if (onClose) onClose()
    }, 600)
  }

  if (!model || !isVisible) return null

  return createPortal(
    <div
      onClick={handleClose}
      className={`
        fixed inset-0  bg-opacity-50 backdrop-blur-sm
        flex justify-center items-center z-50 p-4
        transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100' : 'opacity-0'}
      `}
      style={{ 
        animation: isOpen ? 'fadeIn 0.3s ease-out' : 'fadeOut 0.3s ease-in'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white w-full max-w-sm sm:max-w-md mx-4
          p-6 sm:p-8 rounded-2xl shadow-2xl
          transform transition-all duration-300 ease-out
          ${isOpen 
            ? 'scale-100 translate-y-0 opacity-100' 
            : 'scale-95 translate-y-4 opacity-0'
          }
          ${isDeleting ? 'animate-pulse' : ''}
        `}
        style={{
          animation: isOpen 
            ? 'slideUp 0.3s ease-out' 
            : 'slideDown 0.3s ease-in'
        }}
      >
        {/* Header with close button */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`
              p-2 rounded-full transition-all duration-300
              ${isDeleting ? 'bg-red-100 animate-bounce' : 'bg-red-50'}
            `}>
              <AiOutlineWarning 
                size={24} 
                className={`
                  transition-colors duration-300
                  ${isDeleting ? 'text-red-600 animate-pulse' : 'text-red-500'}
                `} 
              />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Confirm Delete
            </h2>
          </div>
          
          <button
            onClick={handleClose}
            disabled={isDeleting}
            className={`
              p-1 rounded-full text-gray-400 hover:text-gray-600 hover:cursor-pointer
              hover:bg-gray-100 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-gray-300
              ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-110'}
            `}
            title="Close"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Todo Preview */}
        {todo && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-red-400">
            <h3 className="font-semibold text-gray-800 mb-1 truncate">
              {todo.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {todo.description}
            </p>
          </div>
        )}

        {/* Warning Message */}
        <div className="mb-6">
          <p className="text-center text-gray-700 leading-relaxed">
            Are you sure you want to{' '}
            <span className="text-red-500 font-bold">permanently delete</span>{' '}
            this task?
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            This action cannot be undone.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={handleClose}
            disabled={isDeleting}
            className={`
              flex-1 px-6 py-3 rounded-lg font-semibold hover:cursor-pointer
              border-2 border-gray-300 text-gray-700 bg-white
              hover:bg-gray-50 hover:border-gray-400
              focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
              transition-all duration-200 ease-in-out
              ${isDeleting 
                ? 'opacity-50 cursor-not-allowed' 
                : 'transform hover:scale-[1.02] active:scale-[0.98]'
              }
            `}
          >
            Cancel
          </button>
          
          <button
            onClick={HandleDelete}
            disabled={isDeleting}
            className={`
              flex-1 px-6 py-3 rounded-lg font-semibold
              text-white transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
              ${isDeleting
                ? 'bg-red-400 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600 transform hover:scale-[1.02] active:scale-[0.98]'
              }
            `}
          >
            {isDeleting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Deleting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 hover:cursor-pointer">
                <FiTrash2 size={18} />
                <span>Delete</span>
              </div>
            )}
          </button>
        </div>

        {/* Progress indicator when deleting */}
        {isDeleting && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-red-500 h-2 rounded-full animate-progress"></div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
        }
        
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        .animate-progress {
          animation: progress 0.6s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>,
    model
  )
}

export default Delete