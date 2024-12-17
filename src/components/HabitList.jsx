// Component för rendering av filtrerade/sorterade habits
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
    if (!sortField) return 0;

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
    <ul>
      {sortedHabits.map((habit) => (
        <li key={habit.id}>
          <strong>
            {habit.title}, Prioritet: {habit.priority}, Repetitioner: {habit.reps}
          </strong>
          <button onClick={() => increaseReps(habit.id)}>+</button>
          <button onClick={() => decreaseReps(habit.id)}>-</button>
          <button onClick={() => deleteHabit(habit.id)}>X</button>
        </li>
      ))}
    </ul>
  );
};

export default HabitList;