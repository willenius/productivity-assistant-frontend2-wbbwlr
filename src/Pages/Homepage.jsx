import { useEffect, useState } from "react";
import Todo from "./Todo";
import Habits from "./Habits";
import EventCalendar from "./EventCalendar";
import { Link } from "react-router-dom";

let HomePage = () => {
    // State för localStorage
    let [items, setItems] = useState([]);
    // Hämtar användare ifrån localstorage
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData) {
            setItems(storedData);
        }
    }, [])

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
                <h1 className = "homepageHeader">Home</h1>
                <nav className="navMenu">
                    <Link className="links" to="/Todo&Activities"><p>Todo & Activities</p></Link>
                    <Link className="links" to="/Habits"><p>Habits</p></Link>
                    <Link className="links" to="/EventCalendar"><p>Event Calendar</p></Link>
                </nav>
            </div>
            {greeting.map((quote, index) => {
                return (
                    <div className="apiQuote" key={index}>
                        <h4>Quote of the day:</h4>
                        <p>{quote.quote}..</p>
                        <p>{quote.author}</p>
                    </div>
                )
            })}
            <h3 className="event-header-home">Event Calendar</h3>
            <div className="ev-container">
                {/* Mappa genom de första tre events om de finns med hjälp av ? (if sats)*/}
                {items.events && items.events.length > 0 ? (
                    items.events.slice(0, 3).map((event, index) => {
                        return (
                            <div className="event-data" key={index}>
                                <p><strong >{event.eventName}</strong></p>
                                <p>Start Date: <span className="event-dates">{event.eventStartDate}</span></p>
                                <p>End Date: <span className="event-dates">{event.eventEndDate}</span></p>
                                <p>Start Time: <span className="event-times">{event.eventStartTime}</span></p>
                                <p>End Time: <span className="event-times">{event.eventEndTime}</span></p>
                            </div>
                        );
                    })
                ) : (
                    <p>No events found</p>
                )}
            </div>
            <div>
                <h3 className="topHabitsHeader">Top Habits</h3>
                <div className="topHabitsContainer">
                {items.habits && items.habits.length > 0 ? (
                    [...items.habits]
                    .sort((a, b) => b.reps - a.reps)
                    .slice(0, 3)
                    .map((habit, index) => (
                        <div className= "habitData" key={index}>
                            <p><strong className="tophabitsSubHeadline">{habit.title}</strong></p>
                            <p>Repititioner: {habit.reps}</p>
                            <p>Prioritet: {habit.priority}</p>
                        </div>
                    ))
                ) : (
                <p>No habits found</p>
                )}

                </div>
            </div>
            

        </div>
    )
}
export default HomePage;