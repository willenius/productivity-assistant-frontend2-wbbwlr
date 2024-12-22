import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import "../App.css";

let TodoRoute = () => {
    let { id } = useParams();
    console.log(id);
    let location = useLocation();

return  ( 
    <>
    <Navbar />
    <div className="routeTodo">
      <h1>{location.state.todoTitle}</h1>
      <p>{location.state.todoDescription}</p>
      <p>Category: {location.state.todoCategory}</p>
      <p>Time Estimate: {location.state.todoTimeEstimate}</p>
      <p>Deadline: {location.state.todoDeadline}</p>
    </div>
    </>
)
}

export default TodoRoute;