import React from "react";

    let DeleteTodo = ({ deleteTodo, index }) => {
        return (
            <button onClick={() => deleteTodo(index)}>Delete</button>
        );
    }

export default DeleteTodo;
