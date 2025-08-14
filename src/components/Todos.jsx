import React from 'react'
import { useSelector } from 'react-redux'
import { AiTwotoneDelete } from "react-icons/ai";

function Todos() {
  const todos = useSelector((state) => state.todos)

  return (
    <div className="flex justify-center mt-6">
      <div className="w-[400px] border-2 border-gray-300 rounded-lg shadow-md bg-white">
        <ul className="divide-y divide-gray-200">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 transition"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">{todo.title}</p>
                <p className="text-sm text-gray-600">{todo.description}</p>
              </div>

              <button
                className="text-red-500 hover:text-red-700 transition"
                title="Delete Task"
              >
                <AiTwotoneDelete size={22} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Todos
