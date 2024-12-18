import { useState, useEffect } from "react";
import "../App.css";
import { Routes, Route } from "react-router-dom";

let AddTodoList = () => {
  //states för inputs

  //masterstate, här samlas alla mina inputs och skrivs ut
  let [todos, setTodos] = useState([]);

  let [todoTitle, setTodoTitle] = useState("");
  let [todoCategory, setTodoCategory] = useState("");
  let [todoDescription, setTodoDescription] = useState("");
  let [todoTimeEstimate, setTodoTimeEstimate] = useState("");
  let [todoDeadline, setDeadline] = useState("");
 

//state för edit
  let [editing, setEditing] = useState (null);

  // State för localStorage
    let [items, setItems] = useState([]);
   // Hämtar användare ifrån localstorage
    useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData) {
        console.log(storedData)
        setItems(storedData);
    }
}, [])

  //för att hantera varje state som hämtar innehåll baserat på inputs
  let handleTitleChange = (e) => {
    setTodoTitle(e.target.value);
    }

  let handleDescriptionChange = (e) => {
    setTodoDescription(e.target.value);
  }

  let handleCategoryChange = (e) => {
    setTodoCategory(e.target.value);
  }

  let handleTimeEstimateChange = (e) => {
    setTodoTimeEstimate(e.target.value);
  }

  let handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  }

  //funktion för att lägga till tasks och för att en användare MÅSTE Skriva in något i sin task. basically, om tomt så kommer det att alertas.
  //Kommer eventuellt att byta till required
  //la till prevent default för att sidan ständigt laddades om när jag skapade en ny todo.
  let addNewTodo = () => {
    if (!todoTitle || !todoDescription || !todoCategory || !todoTimeEstimate || !todoDeadline) {
          return alert("Most fill all fields!");
    }
      //skapar nytt todo med värdena från mitt form
    let newTodoObject = {
      todoTitle,
      todoDescription,
      todoCategory,
      todoTimeEstimate,
      status: false,
      todoDeadline,
    };

    //hämtar vårt nya todo-objekt och skickar in det i todo-listan
    setTodos([...todos, newTodoObject]);

    //när en användare har skapat en todo så rensas fälten. dvs, när jag vill skapa en ny todo så är de inte ifyllda. valde att spara kvar datum.
    setTodoTitle("");
    setTodoDescription("");
    setTodoCategory("");
    setTodoTimeEstimate("");
  };

  //ta bort skapad task. underscore använder jag som en placeholder, .
  function deleteTodo(index) {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  }

  //funktion för editknapp.
let editTodo = (index) => {
  const todoToEdit = todos[index];
	  setTodoTitle(todoToEdit.todoTitle);
	  setTodoCategory(todoToEdit.todoCategory);
	  setTodoDescription(todoToEdit.todoDescription);
	  setTodoTimeEstimate(todoToEdit.todoTimeEstimate);
    setDeadline(todoToEdit.deadline);
    setEditing(index)
}
//funktion för editknapp. mappar igenom alla mina todos(kategorier) och när edit är klickat så går det att spara direkt.
let saveEditingBtn = () => {
  const updatedTodo = { todoTitle, todoDescription, todoCategory, todoTimeEstimate, todoDeadline, status: todos[editing].status};
  const updatedTodos = todos.map((todo, index) => {
    if (index === editing)
    {
      return updatedTodo;
    }
    console.log(updatedTodos)
      return todo;
  });
  setTodos(updatedTodos)
  setEditing(null)
}
  //ändra status, om ifylld = klar.
  let toggleStatus = (index) => {
    const updatedStatus = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, status: !todo.status };
      }
      return todo;
    });
    setTodos(updatedStatus);
  };
  // Formulär för att skapa en todo, inputs etc.
  return (
    <>
      <div className="todo-container">
        <form>
        <input type="text" placeholder="Title" value={todoTitle} onChange={handleTitleChange}/>
        <input type="text" placeholder="Description" value={todoDescription} onChange={handleDescriptionChange}/>
        <select id="categoryToDo"value={todoCategory} onChange={handleCategoryChange}>
          <option>Choose category</option>
          <option>Health</option>
          <option>Work</option>
          <option>Chores</option>
        </select>
        <select value={todoTimeEstimate} onChange={handleTimeEstimateChange}>
          <option> Estimated time:</option>
          <option>15min</option>
          <option>30min</option>
          <option>45min</option>
          <option>1h</option>
        </select>
        </form>
        <input type="date" value={todoDeadline} onChange={handleDeadlineChange} />
        <button className="addTodoBtn" onClick={addNewTodo}>Add To-Do</button>
      </div>
      {/* Här skriver jag sen ut hela listan baserat på inputs */}
      {/* märkte rätt snabbt att utan destructure så behövde jag skriva todo.todoCategory etc, blev lite mer "lättläst" efter det */}
      <div className="todoDiv">
        {todos.map((todo, index) => {
            let { todoTitle, todoDescription, todoCategory, timeEstimate, todoDeadline } = todo;
          return (
          <ul className="todoUL" key={index}>
            <h2>{todoTitle}</h2>
            <p>{todoDescription}</p>
            <p>Category: {todoCategory}</p>
            <p> {timeEstimate}</p>
            <p>Deadline: {todoDeadline}</p>
            <label>
              <input type="checkbox" checked={todo.status} onChange={() => toggleStatus(index)}/>
                Status: {todo.status ? "Completed" : "Not done"}
            </label>
            <button id="editingBtn" onClick={() => {editTodo(index)}}>Edit</button>
            <button id="deleteTodoBtn" onClick={() => {deleteTodo(index)}}>Delete</button>
        
            {/* här är min editing funktion. så n */}
            {editing === index ? (
                <div>
                  <input type="text" onChange={handleTitleChange} placeholder={todoTitle}/>
                  <input type="text" onChange={handleDescriptionChange} placeholder={todoDescription}/>
                  <select value={todoCategory} onChange={handleCategoryChange}>
                    <option>Choose category</option>
                    <option>Health</option>
                    <option>Work</option>
                    <option>Chores</option>
                  </select>
                  <button onClick={saveEditingBtn}>Save edits</button>
                </div>


              ) : null}
            </ul>
          );
        })}
      </div>
    </>
  );
};

export default AddTodoList;
