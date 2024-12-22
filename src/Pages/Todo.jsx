import { useState, useEffect } from "react";
import AddTodoList from "../components/AddTodoList";
import Navbar from "../components/navbar";

let Todo = () => {

  return (
    <>
      <h1 style={{ textAlign: "center", color: "black" }}> ToDo</h1>
      <Navbar />
      <AddTodoList />      
    </>
  );
};
export default Todo;
