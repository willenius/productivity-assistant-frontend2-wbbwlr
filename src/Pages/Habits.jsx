import { useState, useEffect } from "react";

let Habits = () => {

    //states för alla olika inputs
    let [title, setTitle] = useState('');
    let [reps, setReps] = useState('');
    let [priority, setPriority] = useState('');
    // state för kombinerade inputs
    let [habits, setHabits] = useState([]);

    //State för val av prioritet när man ska filtrera
    let[filterPriority, setFilterpriority] = useState('');


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
        if (!title || !reps || !priority) {
            alert("You have to select all the fields before you are done!")
            return;
        }
        //habitObject kallar på mina states
        let habitObject = {reps: Number(reps), priority, title}
        //updatedArray tar infon från mitt stora/kombinerade state
        let updatedArray = [...habits]
        // skickar in habitObject i uppdaterade arrayen
        updatedArray.push(habitObject)
        // skickar in updatedArray i habits
        setHabits(updatedArray)

        //rensar mina inputfält efter submit
        setTitle('');
        setReps('');
        setPriority('');

    }

    //funktion för ökning av reps knappen
    let increaseReps = (originalIndex) => {
        //skapar ny array (updatedHabits) och gör kopia av habits arrayen
        let updatedHabits = habits.map((habit, index) => {

            if(index === originalIndex) {
                return {...habit, reps: habit.reps +1}
            }
            return habit;
        })

            //anropar setHabits state för att uppdatera med nya arrayen
            setHabits(updatedHabits);
        }
   
    
        //funktion för minskning av reps
    let decreaseReps = (originalIndex) => {
        let updatedHabits = habits.map((habit, index) => {
            if(index === originalIndex && habit.reps > 0) {
                return {...habit, reps: habit.reps - 1}
            }
            return habit;
        })
        setHabits(updatedHabits)
    }



        //funktion för att ta bort en habit
    let deleteHabit = (originalIndex) => {
        let updatedArray = habits.filter((habit, index) => index !== originalIndex)
        setHabits(updatedArray)

    }

    //funktion för filtrering baserat på prioritet
    let filteredHabits = habits.filter((habit) => {
        if(!filterPriority) {
            return true;
        } else {
            return habit.priority === filterPriority;
        }
    })


    return (
        <>
            <div className="habitsContainer">
            <h2>Habits</h2>
            <form>
                <input type="text" placeholder="Titel" value={title} onChange={(event) => setTitle(event.target.value)}></input>
                <input type="number" placeholder="Repitioner" value={reps} onChange={(event) => setReps(event.target.value)}></input>
                <br/>
                <label htmlFor ="priority">Prioritet: </label>
                <select id="priority" name="priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
                    <option value={""}>Välj prioritet</option>
                    <option>Låg</option>
                    <option>Mellan</option>
                    <option>Hög</option>
                </select>         

            </form>
                <button  onClick={createHabit}>Klar</button>
                
                <h3>Filtrera efter prioritet:</h3>
                <select value={filterPriority} onChange={(event) => setFilterpriority(event.target.value)}>
                
                <option value="">Visa alla</option>
                <option>Låg</option>
                <option>Mellan</option>
                <option>Hög</option>

                </select>
            
            <ul>
                {filteredHabits.map((habit) => {
                    let originalIndex = habits.findIndex(h => h === habit)
                    return(

                    <li key={originalIndex}><strong>{habit.title}, Prioritet: {habit.priority}, Repititioner: {habit.reps} </strong>
                    <button onClick={() => increaseReps(originalIndex)}>+</button>
                    <button onClick={() => decreaseReps(originalIndex)}>-</button>
                    <button onClick={() => deleteHabit(originalIndex)}>X</button>
                    </li>
                    )
                })}      
            </ul>
            

            </div>
        </>
    )
}
export default Habits;

