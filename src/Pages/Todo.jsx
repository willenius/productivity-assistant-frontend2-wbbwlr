import { useState, useEffect } from "react";
import AddTodoList from "../components/AddTodoList";
import Navbar from "../components/navbar";
let Todo = () => {
  //states för tasks
   /* //State för localStorage
   let [items, setItems] = useState([]);
   // Hämtar användare ifrån localstorage
   useEffect(() => {
     const storedData = JSON.parse(localStorage.getItem("userData"));
     if (storedData) {
       console.log(storedData);
       setItems(storedData);
     }
   }, []); */
  
  return (
    <>
      <h1 style={{ textAlign: "center", color: "black" }}> ToDo</h1>
      <AddTodoList />
    </>
  );
};
export default Todo;
