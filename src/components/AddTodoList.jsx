import { useState } from "react";
import "../App.css";
import TodoRoute from "../Pages/TodoRoute";
import { Link } from "react-router-dom";

let AddTodoList = () => {
//masterstate, här samlas alla mina inputs och skrivs ut
  let [todos, setTodos] = useState([]);
  //state-inputs för alla mina todos
  let [todoTitle, setTodoTitle] = useState("");
  let [todoCategory, setTodoCategory] = useState("");
  let [todoDescription, setTodoDescription] = useState("");
  let [todoTimeEstimate, setTodoTimeEstimate] = useState("");
  let [todoDeadline, setDeadline] = useState("");
  let [sortOption, setSortOption] = useState("");

//state för att visa ut kategori och status
  let [todoFilter, setTodoFilter] = useState({category: "", status: ""});

//state för edit
  let [editing, setEditing] = useState (null);

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

  let filterHandleChange = (e) => {
    const { name, value } = e.target;
    setTodoFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value
    }));
  };

  //funktion för att lägga till tasks och för att en användare MÅSTE Skriva in något i sin task. basically, om tomt så kommer det att alertas.
  let addNewTodo = () => {
    if (!todoTitle || !todoDescription || !todoCategory || !todoTimeEstimate || !todoDeadline) {
      return alert("Must fill all fields!");
    }
    //innehåll för att skapa en task
    let newTodoObject = {
      todoTitle,
      todoDescription,
      todoCategory,
      todoTimeEstimate,
      status: false,
      todoDeadline
    };
  
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos, newTodoObject];
      return updatedTodos.sort((a, b) => {
        let dateA = new Date(`${a.todoDeadline} ${a.todoTimeEstimate}`);
        let dateB = new Date(`${b.todoDeadline} ${b.todoTimeEstimate}`);
        return dateA - dateB;
      });
    });
  //för att tömma alla fälten när man har skapat en to-do.
    setTodoTitle("");
    setTodoDescription("");
    setTodoCategory("");
    setTodoTimeEstimate("");
    setDeadline(``);
  };

  //filtreringsfunktion. jämför filter med kategori först, om de är strong equal så kommer kategoriena att matcha, likadant med status.
  let filteredTodos = todos.filter((todo) => {
    const matchCategory = todoFilter.category ? todo.todoCategory === todoFilter.category : true;
    const matchStatus = todoFilter.status ? (todoFilter.status === "completed" ? todo.status : !todo.status) : true;
    return matchCategory && matchStatus;
  });

  //jag gör en kopia av filteredtodos m spread.
  //filtrerar först på deadline (dvs datum), time estimate blir alltså närmaste och i praktiken det närmaste det alltid kommer först. 
  //om vi har två todos, en på 1h och en på 4h så kommer den att välja tidsestimeringen närmst.
  //filtrerar jag på deadline (datum när det senast ska vara klart) så kommer det senaste datumet. ev 

  let sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortOption === "deadline") {
      const dateA = new Date(`${a.todoDeadline}T${a.todoTimeEstimate}`);
      const dateB = new Date(`${b.todoDeadline}T${b.todoTimeEstimate}`);
      return dateA - dateB;
    } else if (sortOption === "timeEstimate") {
      const timeA = parseInt(a.todoTimeEstimate);
      const timeB = parseInt(b.todoTimeEstimate);
      return timeA - timeB;
      //sorterar statusen
      //jag hade a.status - b-status, tidigare. nu är 1 = true och 0 = false.
    } else if (sortOption === "status") {
      return (a.status ? 1 : 0) (b.status ? 1: 0)
    }
  });

  //ta bort skapad task. underscore__ använder jag som en placeholder.
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
//funktion för editknapp. mappar igenom alla mina todos(kategorier) och när edit är klickat så går det att spara.
//destructar även här, pga mer läsvänligt.
let saveEditingBtn = () => {
  const updatedTodo = { todoTitle, todoDescription, todoCategory, todoTimeEstimate, todoDeadline, status: todos[editing].status};
  const updatedTodos = todos.map((todo, index) => {
    if (index === editing)
    {
      return updatedTodo;
    }
      return todo;
  });
  setTodos(updatedTodos)
  //återställer värdet. 
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

  return (
    <>
    {/* här skapar användaren sina to-dos. */}
  <div className="todo-container">
    <form>
      <input type="text" placeholder="Title" value={todoTitle} onChange={handleTitleChange}/>
      <input type="text" placeholder="Description" value={todoDescription} onChange={handleDescriptionChange}/>
        <select id="categoryToDo"value={todoCategory} onChange={handleCategoryChange}>
          <option>Choose category:</option>
          <option>Health</option>
          <option>Work</option>
          <option>Chores</option>
        </select>
        <input type="time" placeholder={todoTimeEstimate} onChange={handleTimeEstimateChange}/>
        </form>
        <input type="date" value={todoDeadline} onChange={handleDeadlineChange}/>
        <button className="addTodoBtn" onClick={addNewTodo}>Add new to-do</button>
        {/* filter för att söka på kategori, ändrade till option values så att den matchar kategor som man söker på. */}
      </div>
        <div className="todoCateFilter">
      <select name="category" value={todoFilter.category} onChange={filterHandleChange}>
        <option value="">All categories</option>
        <option value="Health">Health</option>
        <option value="Work">Work</option>
        <option value="Chores">Chores</option>
      </select>
    </div>
        {/* sortering på deadline och tids estimering*/}
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sort</option>
          <option value="deadline">Deadline</option>
          <option value="timeEstimate">Time estimate</option>
</select>
    {/* här visar jag ut status = complete eller /incomplete */}
    <select name="status" value={todoFilter.status} onChange={filterHandleChange}>
      <option value="">All status</option>
      <option value="completed">Completed</option>
      <option value="notCompleted">Not completed</option>
    </select>
      {/* Här skriver jag sen ut hela listan baserat på inputs */}
      {/* märkte rätt snabbt att utan destructure så behövde jag skriva todo.todoCategory etc, blev lite mer "lättläst" efter det */}
<div className="todoDiv">
        {sortedTodos.map((todo, index) => {
            let { todoTitle, todoDescription, todoCategory, todoTimeEstimate, todoDeadline } = todo;
          return (
  <ul className="todoUL" key={index}>
        <h2>{todoTitle}</h2>
        <p>{todoDescription}</p>
        <p>Category: {todoCategory}</p>
        <p> {todoTimeEstimate}</p>
        <p>Deadline: {todoDeadline}</p>
      <label htmlFor="todoBtns">
        <button id="statusBtn" onClick={() => toggleStatus(index)}>Done</button> {todo.status ? "Completed" : "Not completed"}
      </label>
        <button id="editingBtn" onClick={() => {editTodo(index)}}>Edit</button>
        <button id="deleteTodoBtn" onClick={() => {deleteTodo(index)}}>Delete</button>
            
            <Link to={`/Todo/${index+1}`} state={todo}> <p>Show more</p> </Link>
            <br></br>
            <button onClick={saveEditingBtn}>Save edits</button>
            {/* här är min editing funktion. när man klickar på edit så visas edit-formuläret ut*/}
            {editing === index ? (
        <div>
            <input type="text" onChange={handleTitleChange} placeholder={todoTitle}/>
            <input type="text" onChange={handleDescriptionChange} placeholder={todoDescription}/>
          <select onChange={handleCategoryChange} placeholder={todoCategory}>
            <option>Choose category:</option>
            <option>Health</option>
            <option>Work</option>
            <option>Chores</option>
          </select>
            <input type="time" value={todoTimeEstimate} onChange={handleTimeEstimateChange}/>
              <input type="date" onChange={handleDeadlineChange} placeholder={todoDeadline}/>
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
