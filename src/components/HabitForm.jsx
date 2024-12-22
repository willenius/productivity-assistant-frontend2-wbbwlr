// Component för hantering av nya Habits
import { useContext } from "react";
import { HabitsContext } from "../Pages/Habits";

const HabitForm = () => {
    //hämtar värden och funktioner från habits.jsx mha context
  const { title, setTitle, reps, setReps, priority, setPriority, createHabit } =
    useContext(HabitsContext);

  return (
    <>
    <div className="habitFormContainer">
      <form className="habitForm">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type="number" placeholder="Repetitions" value={reps} onChange={(e) => setReps(e.target.value)}/>

        <select id="priority" name="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Choose priority:</option>
          <option value="low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </form>
      <button className="postHabitsBtn" onClick={createHabit}>Add</button>
    </div>
    </>
  );
};

export default HabitForm;