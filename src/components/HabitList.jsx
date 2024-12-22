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
      const priorityOrder = ["Låg", "Mellan", "Hög"];
      return sortOrder === "ascending"
        ? priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
        : priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority);
    }
    return 0;

    
  });

  return (
    <ul className="renderedHabits">
      {sortedHabits.map((habit) => (
        <li key={habit.id}>
          <p>
            {habit.title}, <br></br>
            Prioritet: {habit.priority}, <br></br>
            Repetitioner: {habit.reps} 
            <button onClick={() => increaseReps(habit.id)}>+</button>  
            <button onClick={() => decreaseReps(habit.id)}>-</button>
          </p>
          <button className="deleteHabitBtn" onClick={() => deleteHabit(habit.id)}>ta bort</button>
          <hr></hr>
        </li>
      ))}
    </ul>
  );
};

export default HabitList;