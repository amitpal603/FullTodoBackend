import React from 'react'
import { useDispatch } from 'react-redux'
import { createPortal } from 'react-dom'

function Delete({ isOpen, todo, setIs, remove }) {
  const dispatch = useDispatch()
  const model = document.getElementById('portal')

  const HandleDelete = () => {
    dispatch(remove(todo.id))
    setIs(false)
  }

  if (!model || !isOpen) return null

  return createPortal(
    <div
      onClick={() => setIs(false)}
      className="fixed top-0 left-0 w-full h-screen  bg-opacity-40 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[350px] p-6 rounded-lg shadow-xl"
      >
        <p className="text-center font-semibold text-lg mb-6">
          Are you sure you want to
          <span className="text-red-500 font-bold">delete</span> this todo?
        </p>

        <div className="flex justify-around">
          <button
            onClick={() => setIs(false)}
            className="px-5 py-2 rounded-md border hover:text-white border-gray-400 text-gray-700 font-medium hover:bg-green-400 hover:rounded-full transition"
          >
            Cancel
          </button>
          <button
            onClick={HandleDelete}
            className="px-5 py-2 rounded-md border border-gray-400  font-medium hover:bg-red-500 hover:text-white  hover:rounded-full transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    model
  )
}

export default Delete
