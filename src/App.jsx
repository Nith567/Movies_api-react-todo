import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

import { useEffect } from "react";

 function App() {
  let localvalue;
  const [newItem,setNewItem]=useState("")
  const [todos,setTodos]=useState(()=>{

    localvalue=localStorage.getItem("ITEM")
      if(localvalue==null)return []
      else 
      return JSON.parse(localvalue)
    });


  useEffect(()=>{
localStorage.setItem("ITEM",JSON.stringify(todos))
  },[todos])




function handlerSubmit(e){
  e.preventDefault();
  setTodos(currentTodos=>{
   return [ ...currentTodos, {
  id: uuidv4(),title:newItem,completed: false},
  ]
  })
  setNewItem(" ")
}
console.log(localvalue);

 function toggleTodo(id, completed) {
  setTodos(currentTodos => {
    return currentTodos.map(todo => {
      if (todo.id == id) {
        return { ...todo, completed }
      }

      return todo
    })
  })
}


function deleteTodo(id){
  setTodos(currentTodos=>{
    return currentTodos.filter(todo=>todo.id!== id)
  })
}



  return (
    <>
   <form onSubmit={handlerSubmit} className="new-item-form">
        <div className="form-row">
        
         <label htmlFor="item">NEW TODO LIST ITEM </label>
         <input value={newItem} onChange={(e)=>setNewItem(e.target.value)} type="text"  id="item" placeholder="Enter routinue"/>
        </div>

<button className="bg-cyan-500 text-gray-700">Add Event</button>
   </form>


    <h1 className="header">TodoLists</h1>
    <ul className="list">
      {todos.length==0 && "No Todo Tasks"}
    {todos.map(todo=>{
 return(<li key={todo.id}> 
 <label>
 <input type="checkbox" onChange={(e)=>toggleTodo(todo.id,e.target.checked)}   checked={todo.completed} />{todo.title}
 </label>
 <button  onClick={()=>deleteTodo(todo.id)}        className="bg-red-800 w-24 p-4 ml-8 rounded-md text-white">Delete</button>
 </li>
      )})}
     
    </ul>
    </>
  )
}
export default App
