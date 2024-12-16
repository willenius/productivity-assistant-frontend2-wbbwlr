import { useState } from "react";
import Todo from "../Pages/Todo";
//AddTodo komponent & useStates för att skapa task

let AddTodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  //för att skapa en ny task (todo)
  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  //funktion för att lägga till tasks och för att en användare MÅSTE Skriva in något i sin task.basically, om tomt så kommer det att alertas.
  //Kommer eventuellt att byta till required
  function addNewTodo() {
    if (newTodo === "")
      return(
        alert("You most submit a task")
      )
    setTodos((todos) => [...todos, newTodo]);
    setNewTodo("");
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Add task..."
          value={newTodo}
          onChange={handleInputChange}
        />
        <button className="addTodoBtn" onClick={addNewTodo}>
          Add To-Do
        </button>
      </div>
      {/* nu vill jag få ut något från min todo */}
      <ol>
        
        {todos.map((todo, index) => (
          <li key={index}>{todo}
          <button id="deleteTodoBtn"> Delete</button> </li>
          
        ))}
      </ol>
    </>
  );
};

export default AddTodoList;
