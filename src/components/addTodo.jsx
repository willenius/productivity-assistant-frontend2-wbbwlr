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

//funktion för att lägga till tasks och för att en användare MÅSTE Skriva in något i sin task. 
//skapa en block dvs om det är en tom string som blir inskickad så ska det inte fungera
  function addNewTodo() {
   setTodos(todos => [...todos, newTodo]);
   setNewTodo("");
  }
  return (
    <>
    <div>
    <input
      type="text"
      placeholder="Add task..."
      value={newTodo}
      onChange={handleInputChange}/>
      <button className="addTodoBtn" onClick={addNewTodo}>Add To-Do</button>
      </div>
      {/* nu vill jag få ut något från min todo */}
      <ol>
        {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
        ))}
      </ol>
      </>
  );
};

export default AddTodoList;
