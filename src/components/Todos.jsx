import React, { useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { AiTwotoneDelete } from "react-icons/ai";
import {deleteTodo} from '../features/todo/todoSlice'
import Delete from './Delete';

function Todos() {
  const todos = useSelector((state) => state.todos)
  const dispatch = useDispatch()
  const [isOpen,setIsOpen] = useState(false)
  const [select,setSelect] = useState(null)
console.log(todos);
 const HandleClick = (todo) => {
    setSelect(todo)
    setIsOpen(true)
 }
  return (
    <div className="flex justify-center mt-6">
      <div className="w-[400px] max-h-[400px] overflow-y-auto border-2 border-gray-300 rounded-lg shadow-md bg-white">
        <ul className="divide-y divide-gray-200">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 transition"
            >
              <div>
                <p className="text-lg font-bold text-red-500">{todo.title}</p>
                <p className="text-base font-bold text-gray-600">{todo.description}</p>
              </div>

              <button
                className="text-red-500 hover:text-red-700 transition hover:cursor-pointer "
                onClick={() => HandleClick(todo)}
                title="Delete Task"
              >
                <AiTwotoneDelete size={22} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Delete isOpen={isOpen} setIs={setIsOpen} remove={deleteTodo} todo={select}/>
    </div>
  )
}

export default Todos
