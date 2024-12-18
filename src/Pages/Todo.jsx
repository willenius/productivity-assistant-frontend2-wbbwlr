import { useState, useEffect } from "react";
import AddTodoList from "../components/AddTodoList";

let Todo = () => {
  //states för tasks
  
  //här är min array där jag samlar de flesta todo:sen. min tanke med objekten i den är att destructa ut de för att sedan låta användare välja själv med hjälp av inputs.
  const todoList = [
    {
      category: "School",
    },
    {
      category: "Work",
    },
    {
      category: "Cleaning",
    },
  ];

  //state för att visa mer information. (toggle)
  /* const [showMore, setShowMore] = useState(false);
  let toggleBtn = () => {
    setShowMore((showMore) => !showMore);
  }; */

  //State för localStorage
  let [items, setItems] = useState([]);
  // Hämtar användare ifrån localstorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData) {
      console.log(storedData);
      setItems(storedData);
    }
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center", color: "black" }}> ToDo</h1>
      <AddTodoList />
      
    </>
  );
};
export default Todo;
