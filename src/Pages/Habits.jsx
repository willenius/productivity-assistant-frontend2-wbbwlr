import { useState, useEffect, createContext } from "react";
import HabitForm from "../components/Habitform";
import HabitFilters from "../components/Habitfilters";
import HabitList from "../components/HabitList";
import Navbar from "../components/navbar";

// Skapar Context
export const HabitsContext = createContext();

const Habits = () => {
    // States
    const [title, setTitle] = useState("");
    const [reps, setReps] = useState("");
    const [priority, setPriority] = useState("");
    const [habits, setHabits] = useState([]);
    const [filterPriority, setFilterPriority] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    
 // State för localStorage
    // Hämtar användare ifrån localstorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.habits) {
        setHabits(storedData.habits)
    }
  }, []);

  // Skapa en habit
  const createHabit = () => {
    if (!title || !reps || !priority) {
      alert("You have to select all the fields before you are done!");
      return;
    }
    //använder Date.now för att skapa unikt id för varje habit och Number för att reps inte ska vara strings
    const habitObject = { id: Date.now(), reps: Number(reps), priority, title };
    
    const updatedHabits = ([...habits, habitObject])
    setHabits(updatedHabits)
    setTitle("");
    setReps("");
    setPriority("");

    // uppdatera localstorage 

    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData) {
         // Uppdatera localstorage med key events som har värdet från event state. 
        storedData.habits = updatedHabits
     // Spara tillbaka den uppdaterade datan till localStorage
    localStorage.setItem('userData', JSON.stringify(storedData));
    // Uppdatera state för att reflektera förändringen
    // setItems(storedData);
    }
  };

  // Öka reps
  const increaseReps = (id) => {
    const updatedHabits = habits.map((habit,) =>
      habit.id === id ? { ...habit, reps: habit.reps + 1 } : habit
    );
    setHabits(updatedHabits);

          // Uppdatera localStorage
  const storedData = JSON.parse(localStorage.getItem("userData"));
  if (storedData) {
    storedData.habits = updatedHabits;
    localStorage.setItem("userData", JSON.stringify(storedData));
  }
  };

  // Minska reps
  const decreaseReps = (id) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === id && habit.reps > 0 ? { ...habit, reps: habit.reps - 1 } : habit
    );
    setHabits(updatedHabits);

          // Uppdatera localStorage
  const storedData = JSON.parse(localStorage.getItem("userData"));
  if (storedData) {
    storedData.habits = updatedHabits;
    localStorage.setItem("userData", JSON.stringify(storedData));
  }

  };

  // Ta bort en habit
  const deleteHabit = (id) => {
    const updatedHabits = habits.filter((habit) => habit.id !== id);
    setHabits(updatedHabits);
  
      // Uppdatera localStorage
  const storedData = JSON.parse(localStorage.getItem("userData"));
  if (storedData) {
    storedData.habits = updatedHabits;
    localStorage.setItem("userData", JSON.stringify(storedData));
  }
};
  // samlar alla state variabler för att kunna skicka med context
  const contextValue = {
    title,
    setTitle,
    reps,
    setReps,
    priority,
    setPriority,
    habits,
    filterPriority,
    setFilterPriority,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    createHabit,
    increaseReps,
    decreaseReps,
    deleteHabit,
  };

  return (
      <>
    <Navbar/>
      <HabitsContext.Provider value={contextValue}>
     <h2 className="habitsHeadline">Habits</h2>
      <div className="habitsContainer">
        <HabitForm />
        <HabitFilters />
        <HabitList />
      </div>
    </HabitsContext.Provider>
    </>
  );
};

export default Habits;
      



 
