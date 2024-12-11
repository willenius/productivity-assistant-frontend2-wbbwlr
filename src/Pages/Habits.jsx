import { useState, useEffect } from "react";

let Habits = () => {

    //states för alla olika inputs
    let [title, setTitle] = useState(``);
    let [reps, setreps] = useState(``);
    let [priority, setpriority] = useState(``);
    // state för kombinerade inputs
    let [habits, setHabits] = useState([]);




    // State för localStorage
    let [items,setItems] = useState([]);
    // Hämtar användare ifrån localstorage
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData) {
            console.log(storedData)
            setItems(storedData);
        }
    },[])

    console.log(title)

    //funktion för min klar knapp
    let createHabit = () => {
        //habitObject kallar på mina states
        let habitObject = {reps, priority, title}
        //updatedArray tar infon från mitt stora/kombinerade state
        let updatedArray = [...habits]
        // skickar in habitObject i uppdaterade arrayen
        updatedArray.push(habitObject)
        // skickar in updatedArray i habits
        setHabits(updatedArray)

    }


    return (
        <>
            <div className="habitsContainer">
            <h2>Habits</h2>
            <form>
                <input type="text" placeholder="Titel" onChange={(event) => setTitle(event.target.value)}></input>
                <input type="number" placeholder="Repitioner" onChange={(event) => setreps(event.target.value)}></input>
                <br/>
                <label htmlFor ="priority">Prioritet: </label>
                <select id="priority" name="priority" onChange={(event) => setpriority(event.target.value)}>
                    <option>Låg</option>
                    <option>Mellan</option>
                    <option>Hög</option>
                </select>         

            </form>
                <button  onClick={createHabit}>Klar</button>
            
            <ul>
                {habits.map((habit, index) => (
                    <li key={index}><strong>{habit.title}, {habit.reps} repitioner, Prioritet: {habit.priority}</strong></li>
                ))}      
            </ul>
            

            </div>
        </>
    )
}
export default Habits;