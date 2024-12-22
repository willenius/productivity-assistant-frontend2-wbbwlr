// Component för rendering av filtrerade/sorterade habits och logiken bakom
import { useContext } from "react";
import { HabitsContext } from "../Pages/Habits";

const HabitList = () => {
  const { habits, increaseReps, decreaseReps, deleteHabit, filterPriority, sortField, sortOrder } = 
  useContext(HabitsContext);

  // Filtrering
  const filteredHabits = habits.filter((habit) => {
    if (!filterPriority) return true;
    return habit.priority === filterPriority;
  });

  // Sortering
  const sortedHabits = [...filteredHabits].sort((a, b) => {
    if (!sortField || !sortOrder) return 0;

    if (sortField === "reps") {
      return sortOrder === "ascending" ? a.reps - b.reps : b.reps - a.reps;
    } else if (sortField === "priority") {
      const priorityOrder = ["Low", "Medium", "High"];
      return sortOrder === "ascending"
        ? priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
        : priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority);
    }
    return 0;

    
  });

  return (

    <ul className="renderedHabits">
      {sortedHabits.map((habit) => (
        <li key={habit.id} className="habitItem">
      <div className="habitDetails">
        <span className="habitTitle"><strong>{habit.title}</strong></span>
        <span className="habitPriority">Priority: {habit.priority}</span>
        <div className="habitRepsContainer">
          <span>Repetitions: {habit.reps}</span>
          <button onClick={() => increaseReps(habit.id)} className="incHabitButton">+</button>
          <button onClick={() => decreaseReps(habit.id)} className="decHabitButton">-</button>
        </div>
      </div>
      <button className="deleteHabitBtn" onClick={() => deleteHabit(habit.id)}>delete</button>
    </li>
      ))}
    </ul>

  );
};

export default HabitList;