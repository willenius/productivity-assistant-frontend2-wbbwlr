import { Link } from "react-router-dom";
let Navbar = () => {
    return (
        <div className="nav-container">
           <Link className="links-navbar" to={"/HomePage"}><p>Home</p></Link>
           <Link className="links-navbar" to={"/Todo&Activities"}><p>Todo & Activities</p></Link>
           <Link className="links-navbar" to={"/Habits"}><p>Habits</p></Link>
           <Link className="links-navbar" to={"/EventCalendar"}><p>Event Calendar</p></Link>
        </div>
    )
}
export default Navbar;