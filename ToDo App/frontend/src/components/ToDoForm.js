import './ToDoForm.css'
import React, { useEffect, useState } from "react";
import ToDoList from "./ToDoList";
let ToDoForm = () => {
let [todo, setTodo] = useState("");
//the state variable todo has an initial value of an empty string. I will use setTodo function to update the value of todo at later point in the component's lifecycle.
let [itemList, setItemlist] = useState([]);  
let onsubmitHandler = async (e) => {
e.preventDefault();                //prevents the default form submission behavior from occurring, which would typically result in a page reload.
 if (!todo) {
    return alert("You have not entered any task,yet!");
  }
try {
await fetch("http://localhost:8081/todo", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
todo: todo,
}),
}).then((response) => {
console.log(response);
setTodo("");
getTodos();
});
} catch (err) {
console.log(err.message);
}
};

let getTodos = async () => {
fetch("http://localhost:8081/todo", {
method: "GET",
})
.then((response) => response.json())
.then((result) => {
var item = Object.keys(result).length ? result.result : [];
setItemlist(item);
})
.catch((error) => {
console.error({ mess: error });
});
};
useEffect(() => {
getTodos();

return () => {
fetch("http://localhost:8081/todo", {
method: "DELETE",
})
.then((response) => response.json())
.then((result) => {
getTodos("");
})
.catch((error) => {
console.error({ mess: error });
});
};
}, []);
return (
<>
<h1>To Do List App</h1>
<form onSubmit={onsubmitHandler}>

 <div className="inputbox">
 <button className='b1' type="button" disabled>Enter the task:</button>
        <input
        placeholder="Enter a task that needs to be done.."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit">  Add Task    </button>
 </div>
<ol>
{itemList.map((item, index) => {
return <ToDoList text={item.todo} key={index} />;   //returns a list of todos
})}
</ol>
</form>
</>
);
};
export default ToDoForm;





