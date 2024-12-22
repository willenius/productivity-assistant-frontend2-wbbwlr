import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Homepage";
import Login from "./Pages/Login";
import "./App.css";
import Todo from "./Pages/Todo";
import Habits from "./Pages/Habits";
import EventCalendar from "./Pages/EventCalendar";
import TodoRoute from "./Pages/TodoRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Todo&Activities" element={<Todo />} />
        <Route path="/Habits" element={<Habits />} />
        <Route path="/Todo/:id" element={<TodoRoute />} />
        <Route path="/EventCalendar" element={<EventCalendar />} />
      </Routes>
    </>
  )
}

export default App;
