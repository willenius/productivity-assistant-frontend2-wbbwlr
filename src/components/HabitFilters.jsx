// Component för filtrering och sortering
import { useContext } from "react";
import { HabitsContext } from "../Pages/Habits";

const HabitFilters = () => {
  const {
    setFilterPriority,
    setSortField,
    setSortOrder,
    filterPriority,
    sortField,
    sortOrder,
  } = useContext(HabitsContext);

  return (
    <div className="filterMenu">
      <label htmlFor="priorityFilter">Filter</label>
      <select
        id="priorityFilter"
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
      >
        <option value="">Alla</option>
        <option value="Låg">Låg prioritet</option>
        <option value="Mellan">Mellan prioritet</option>
        <option value="Hög">Hög prioritet</option>
      </select>

      <label htmlFor="sortField">Sortera efter:</label>
      <select
        id="sortField"
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
      >
        <option value="">Inget</option>
        <option value="reps">Reps</option>
        <option value="priority">Prioritet</option>
      </select>

      <label htmlFor="sortOrder">Sorteringsordning:</label>
      <select
        id="sortOrder"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="">Ingen</option>
        <option value="ascending">Stigande</option>
        <option value="descending">Fallande</option>
      </select>
    </div>
  );
};

export default HabitFilters;