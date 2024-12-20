import { useState, useEffect } from "react";
import "../App.css";
import { Routes, Route } from "react-router-dom";

let AddTodoList = () => {
  //states för inputs

  //masterstate, här samlas alla mina inputs och skrivs ut
  let [todos, setTodos] = useState([]);
//inputs för alla mina todos
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
  };

  //filtreringsfunktion. 
  let filteredTodos = todos.filter((todo) => {
    const matchCategory = todoFilter.category ? todo.todoCategory === todoFilter.category : true;
    const matchStatus = todoFilter.status ? (todoFilter.status === "completed" ? todo.status : !todo.status) : true;
    return matchCategory && matchStatus;
  });

  //jag gör en kopia av filteredtodos m spread. 

  let sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortOption === "deadline") {
      const dateA = new Date(`${a.todoDeadline} ${a.todoTimeEstimate}`);
      const dateB = new Date(`${b.todoDeadline} ${b.todoTimeEstimate}`);
      return dateA - dateB;
    } else if (sortOption === "timeEstimate") {
      const timeA = parseInt(a.todoTimeEstimate);
      const timeB = parseInt(b.todoTimeEstimate);
      return timeA - timeB;
      //sorterar status
    } else if (sortOption === "status") {
      return a.status - b.status;
    }
  });

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
//funktion för editknapp. mappar igenom alla mina todos(kategorier) och när edit är klickat så går det att spara.
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



  return (
    <>
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
        <select value={todoTimeEstimate} onChange={handleTimeEstimateChange}>
          <option> Estimated time:</option>
          <option>30min</option>
          <option>45min</option>
          <option>1h</option>
          <option>2h</option>
          <option>4h</option>
        </select>
        </form>
        <input type="date" value={todoDeadline} onChange={handleDeadlineChange}/>
        <button className="addTodoBtn" onClick={addNewTodo}>Add new to-do</button>
        {/* filter för att söka på kategori, blev mycket hårdkodning över lösningen */}
        </div>
        <div>
        <select name="category" value={todoFilter.category} onChange={filterHandleChange}>
          <option value="">All categories</option>
          <option value="Health">Health</option>
          <option value="Work">Work</option>
          <option value="Chores">Chores</option>
      </select>
      <select name="status" value={todoFilter.status} onChange={filterHandleChange}>
        <option>Completed</option>
        <option>Not done</option>
      </select>
      </div>
        {/* sortering på deadline, tids estimering och status*/}
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option>Deadline</option>
        <option>Time estimate</option>
        <option>Status</option>
      </select>
      {/* Här skriver jag sen ut hela listan baserat på inputs */}
      {/* märkte rätt snabbt att utan destructure så behövde jag skriva todo.todoCategory etc, blev lite mer "lättläst" efter det */}
      <div className="todoDiv">
        {sortedTodos.map((todo, index) => {
            let { todoTitle, todoDescription, todoCategory, timeEstimate, todoDeadline } = todo;
          return (
          <ul className="todoUL" key={index}>
            <h2>{todoTitle}</h2>
            <p>{todoDescription}</p>
            <p>Category: {todoCategory}</p>
            <p> {timeEstimate}</p>
            <p>Deadline: {todoDeadline}</p>
            <label>
              <button id="statusBtn" onClick={() => toggleStatus(index)}>Done</button>
                Done {todo.status ? "Completed" : "Not completed"}
            </label>
            <button id="editingBtn" onClick={() => {editTodo(index)}}>Edit</button>
            <button id="deleteTodoBtn" onClick={() => {deleteTodo(index)}}>Delete</button>
        
            {/* här är min editing funktion. dvs, när "add to-do" är klickat, så visas edit-formuläret */}
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
                  <input type="date" onChange={handleDeadlineChange} placeholder={todoDeadline} />
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
