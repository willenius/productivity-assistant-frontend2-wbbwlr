// Component för val av filtrering och sortering
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
        <option value="">All</option>
        <option value="low">low priority</option>
        <option value="Medium">Medium priority</option>
        <option value="High">High priority</option>
      </select>

      <label htmlFor="sortField">Sort by:</label>
      <select
        id="sortField"
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
      >
        <option value="">None</option>
        <option value="reps">Reps</option>
        <option value="priority">Priority</option>
      </select>

      <label htmlFor="sortOrder">Sort order:</label>
      <select
        id="sortOrder"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="">none</option>
        <option value="ascending">ascending</option>
        <option value="descending">descending</option>
      </select>
    </div>
  );
};

export default HabitFilters;