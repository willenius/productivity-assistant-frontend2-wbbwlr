import { createContext, useContext } from "react";
import { useState } from "react";


let TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState ([]);
//lägger till nya todos
  let addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };
//tar bort nya todos
  let deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id))
  };
//uppdaterar status för en todo. 
  let toggleStatus = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  };
  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, toggleStatus}}>{children}</TodoContext.Provider>
  )
}

