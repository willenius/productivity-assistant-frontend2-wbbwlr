import { useState, useEffect } from "react";

let Todo = () => {

//här är min array där jag samlar de flesta todo:sen. min tanke med objekten i den är att destructa ut de för att sedan låta användare välja själv med hjälp av inputs.
    const todoList = [{
        title: ["Science project"],
        description: "Finish your science project about atoms",
        category: ["School"],
        completed: [true, false],
        timeEstimate: [],
        deadline: [],
    },
    {
        title: ["Work task"],
        description: ["Complete the excel sheet your boss asked for"],
        category: ["Work"],
        completed: [true, false],
        timeEstimate: [],
        deadline: [],
    },
    {
        title: ["Chores"],
        description: ["Clean up the kitchen, it's long overdue"],
        category: ["Cleaning"],
        completed: [true, false],
        timeEstimate: [],
        deadline: [],

    }]

    const [todo, setTodo] = useState("");

    //state för att visa mer information. (toggle)
    const [showMore, setShowMore] = useState(false);
    let toggleBtn = () => {
        setShowMore((showMore) => !showMore);
    }

    //State för localStorage
    let [items, setItems] = useState([]);
    // Hämtar användare ifrån localstorage
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData) {
            console.log(storedData)
            setItems(storedData);
        }
    }, [])

    return (
        <>
            <h1 style={{ textAlign: "center", color: "blue" }}> ToDo</h1>
            <ul>
                {/* desctruct för att skriva ut ärenden/todos. här kommer jag fylla på med */}
                {todoList.map(({ title, description, category }, listArray) => (
                    <li key={listArray}>
                        <div className="todoClass">
                            <p> <strong> {category}</strong>: {title}</p>
                            {/* ternary operator för att kalla på mitt useState */}
                            {showMore && <p>{description} </p>}
                            <button onClick={toggleBtn}> {showMore ? "Show less" : "Show More"}
                            </button>

                        </div>
                    </li>

                ))}
            </ul>
        </>
    )
}
export default Todo;