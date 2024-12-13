// Component för hantering av nya Habits
import { useContext } from "react";
import { HabitsContext } from "../Pages/Habits";

const HabitForm = () => {
  const { title, setTitle, reps, setReps, priority, setPriority, createHabit } =
    useContext(HabitsContext);

  return (
    <>
      <form>
        <input type="text" placeholder="Titel" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type="number" placeholder="Repetitioner" value={reps} onChange={(e) => setReps(e.target.value)}/>

        <br />

        <label htmlFor="priority">Prioritet: </label>
        <select id="priority" name="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Välj prioritet</option>
          <option value="Låg">Låg</option>
          <option value="Mellan">Mellan</option>
          <option value="Hög">Hög</option>
        </select>
      </form>
      <button onClick={createHabit}>Klar</button>
    </>
  );
};

export default HabitForm;