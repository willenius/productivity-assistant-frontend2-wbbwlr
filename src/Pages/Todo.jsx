import { useState, useEffect } from "react";
import AddTodoList from "../components/AddTodoList";

let Todo = () => {
  //states för tasks
  const [todo, setTodo] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [timeEstimate, setTimeEstimate] = useState(``);
  const [deadline, setDeadline] = useState(``);

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
      <ul>
        <form>
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        
          {/* inputs för att användaren själv ska kunna lägga till tasks/todos */}
        <label htmlFor="title">Title:</label>
          <input
            type="text"
            placeholder="Chores, school, work..."
            id="title"
            name="title"
          ></input>
          <br></br>

        <label htmlFor="description">Description:</label>
          <input type="text" placeholder="What are you up to?" id="description" name="description"></input>
          <br></br>

        <label htmlFor="category">Category:</label>
          <select name="category">
            <option value="workout">Workout</option>
            <option value="health">Health</option>
            <option value="chores"> Chores</option>
          </select>

          <br></br>
        <label htmlFor="timeEstimate">Time estimate</label>
          <select id="timeEstimate" name="timeEstimate">
            <option value="1">
              {" "}
              15min
            </option>
            <option value="2">30min</option>
            <option value="2">45min</option>
            <option value="3">1h</option>
          </select>
          <br></br>
        <label htmlFor="deadline">
            Deadline, latest due <br></br>
            <input type="date" id="deadline" name="deadline"></input>
          </label>
      </form>
        {/* desctruct för att skriva ut ärenden/todos. här kommer jag fylla på med */}
        {todoList.map(({ category }, listArray) => (
          <li key={listArray}>
            <div className="todoClass">
              <p>
                {" "}
                <strong> {category}</strong>: {title}
              </p>
              {/* ternary operator för att kalla på mitt useState, som jag ska ta bort pga detta är helt useless just nu x) */}
              {showMore && <p>{description} </p>}
              <button onClick={toggleBtn}>
                {" "}
                {showMore ? "Show less" : "Show More"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Todo;
