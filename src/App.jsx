import React from 'react'
import TodoInput from './components/TodoInput'
import Todos from './components/Todos'

function App() {
    
  return (
  <div className="flex flex-col h-screen items-center gap-5 px-4 mt-9 lg:flex-row lg:items-start lg:justify-center">
    <div className="w-full max-w-md">
       <TodoInput/>
    </div>
  
  <div className="w-full max-w-3xl">
    <Todos/>
  </div>
</div>
  )
}

export default App
