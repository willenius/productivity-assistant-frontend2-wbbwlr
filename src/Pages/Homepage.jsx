import { useEffect, useState } from "react";
import Todo from "./Todo";
import Habits from "./Habits";
import EventCalendar from "./EventCalendar";
import { Link } from "react-router-dom";

let HomePage = () => {
    const [greeting, setGreeting] = useState([])
    useEffect(() => {
        let apiGreeting = async () => {
            //Breaking bad quotes med tanke på att länken vi fick i uppgiften inte fungerande.
            let res = await fetch("https://api.breakingbadquotes.xyz/v1/quotes");
            let json = await res.json()
            setGreeting(json)
        }
        apiGreeting()
    }, [])

    return (
        <div>
            <div className="homeContainer">
                <h1>Home</h1>
                <nav className="navMenu">
                    <Link className="links" to="/Todo&Activitys"><p>Todo & Activities</p></Link>
                    <Link className="links" to="/Habits"><p>Habits</p></Link>
                    <Link className="links" to="/EventCalendar"><p>Event Calendar</p></Link>
                </nav>
            </div>
            {greeting.map((quote, index) => {
                return (
                    <div key={index}>
                        <p>{quote.quote}</p>
                        <p>{quote.author}</p>
                    </div>
                )
            })}

        </div>
    )
}
export default HomePage;