import React from 'react'
import './ToDoList.css'
const ToDoList = (props) => {

   

   return (
    <>
    <div className='lists'>
        <li>{props.text}</li>
   </div>
   </>
  
  )
}

export default ToDoList