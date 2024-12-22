import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/navbar";
let EventCalendar = () => {
    // states för alla inputs
    let [eventName, SetEventName] = useState(``);
    let [eventStartDate, setEventStartDate] = useState('')
    let [eventEndDate, setEventEndDate] = useState('')
    let [eventStartTime, setEventStartTime] = useState('')
    let [eventEndTime, setEventEndTime] = useState('')

    //State för filtrering
    let [filterPriority, setFilterpriority] = useState([])

    //State som array av alla  samlade inputs - Sätt state till localStorage OM det finns, annars sätt en tom array 
    let [event, setEvent] = useState([]);
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
    
        // Om data finns i userData och det finns ett värde på events key i 
        //userData ge event state det värdet annars ge event en tom []
        if (storedData && storedData.events) {
            setEvent(storedData.events);
        } else {   
            setEvent([]);
        }
    }, []);

    // state för editBtn så att ett edit fält ska visas ut.
    let [isEditing, setIsEditing] = useState(null);

    // State för localStorage
    let [items, setItems] = useState([]);

    // Hämtar användare ifrån localstorage
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData) {
            setItems(storedData);
        }
    }, [])

    let eventNameInput = (e) => {
        SetEventName(e.target.value);
    }

    let startDate = (e) => {
        setEventStartDate(e.target.value);
    }

    let endDate = (e) => {
        setEventEndDate(e.target.value);
    }

    let startTime = (e) => {
        setEventStartTime(e.target.value);
    }

    let endTime = (e) => {
        setEventEndTime(e.target.value);
    }

    // Kollar om ett event redan infallit dvs har datumet eller tiden passerat.
    const isEventPast = (eventStartDate, eventStartTime) => {
        const eventDate = new Date(`${eventStartDate} ${eventStartTime}`);
        const now = new Date();
        //returnerar en boolean true eller false, om eventDate är mindre än now 
        //så har datumet redan passerat och det kommer skicka enn boolean av true.
        return eventDate < now;
    };

    // knapp som triggar en push av alla inputs states in i mitt event state.
    let createEvent = () => {
        // if sats för att kolla så att alla inputfälten har ett värde.
        if (!eventName || !eventStartDate || !eventEndDate || !eventStartTime || !eventEndTime) {
            alert("Please input your calendar")
        } else {
            // sparar ner alla input states till eventObject för att sedan lägga in det i 
            // updatedArray och sen lägga in det i event state
            let eventObject = { eventName, eventStartDate, eventEndDate, eventStartTime, eventEndTime }
            //ger updtadetArray värdet av event och eventObject.
            let updatedArray = [...event, eventObject]

            //LOCALSTORAGE-----------------------------------------------------
            const storedData = JSON.parse(localStorage.getItem('userData'));
            if (storedData) {
                // Uppdatera localstorage med key events som har värdet från event state. 
                storedData.events = updatedArray;
                // Spara tillbaka den uppdaterade datan till localStorage
                localStorage.setItem('userData', JSON.stringify(storedData));
                // Uppdatera state 
                setItems(storedData);
            }

            // Sortera listan baserat på startdate och starttime 
            updatedArray.sort((a, b) => {
                const dateA = new Date(`${a.eventStartDate} ${a.eventStartTime}`);
                const dateB = new Date(`${b.eventStartDate} ${b.eventStartTime}`);
                // Sortera i ordning så att närmaste datumet blir först
                return (
                    dateA - dateB
                )
            });
            setEvent(updatedArray);
            // tömmer alla inputs efter att man har skickat in sitt event. (med hjälp value={inputetsState})
            SetEventName(``)
            setEventStartDate('')
            setEventEndDate('')
            setEventStartTime('')
            setEventEndTime('')
        }
    }

    // Funktion för editBtn  sätter isEditing till index för att veta vilket event som ska redigeras.
    let editBtn = (index) => {
        // Baserat på vilket index eventet man vill redigera så kommer eventToEdit veta vilket event som ska redigera
        // och vad som redigeras, ex får eventName värdet av eventName så det är som en kopia har skapat
        const eventToEdit = event[index];
        SetEventName(eventToEdit.eventName);
        setEventStartDate(eventToEdit.eventStartDate);
        setEventEndDate(eventToEdit.eventEndDate);
        setEventStartTime(eventToEdit.eventStartTime);
        setEventEndTime(eventToEdit.eventEndTime);
        setIsEditing(index)
    }

    // save knapp som gör isEditing state till null igen så att edit fältet inte längre visas,
    // uppdaterar även event state med det nya inputsen.
    let saveEditBtn = () => {
        const updatedEvent = { eventName, eventStartDate, eventEndDate, eventStartTime, eventEndTime };
        const updatedEvents = event.map((event, index) => {
            if (isEditing === index) {
                // Uppdatera det valda eventet, updatedEvent = redigerat event. 
                return updatedEvent;
            } else {
                return event;
            }
        });

        //LOCALSTORAGE-----------------------------------------------------
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData) {
            // Uppdatera localstorage med key events som har värdet från event state. 
            storedData.events = updatedEvents;
            // Spara tillbaka den uppdaterade datan till localStorage
            localStorage.setItem('userData', JSON.stringify(storedData));
            // Uppdatera state 
            setItems(storedData);
        }

        // Sortera listan baserat på startdate och starttime 
        updatedEvents.sort((a, b) => {
            const dateA = new Date(`${a.eventStartDate} ${a.eventStartTime}`);
            const dateB = new Date(`${b.eventStartDate} ${b.eventStartTime}`);
            // Sortera i ordning så att närmaste datumet blir först
            return (
                dateA - dateB
            )
        });
        setEvent(updatedEvents);
        setIsEditing(null)
        // tömmer alla inputs efter att man har skickat in sitt event. (med hjälp value={inputetsState})
        SetEventName(``)
        setEventStartDate('')
        setEventEndDate('')
        setEventStartTime('')
        setEventEndTime('')
    }
    //Delete button funktion
    let deleteBtn = (index) => {
        const updatedEvents = event.filter((events, i) => i !== index);

        //LOCALSTORAGE-----------------------------------------------------
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData) {
            // Uppdatera localstorage med key events som har värdet från event state. 
            storedData.events = updatedEvents;
            // Spara tillbaka den uppdaterade datan till localStorage
            localStorage.setItem('userData', JSON.stringify(storedData));
            // Uppdatera state 
            setItems(storedData);
        }

        // Sortera listan baserat på startdate och starttime 
        updatedEvents.sort((a, b) => {
            const dateA = new Date(`${a.eventStartDate} ${a.eventStartTime}`);
            const dateB = new Date(`${b.eventStartDate} ${b.eventStartTime}`);
            // Sortera i ordning så att närmaste datumet blir först
            return (
                dateA - dateB
            )
        });
        //uppdaterar state med det nya som tagit bort de valda eventet.
        setEvent(updatedEvents)
    }

    // onchange för filter selecten.
    let changeFilter = (e) => {
        if (e.target.value === "Upcoming events") {
            upcomingEv();
        } else if (e.target.value === "Previous events") {
            previousEv();
        } 
    }
    //Funktion för filtreringsfunktioner. (Skulle dagens datum vara mindre än de inskickade datumet 
    //så har eventet inte skett än och filterPrioroty sätts till upcoming)
    let upcomingEv = () => {
        const today = new Date().getTime();
        // upcomming får värderna av event.filter, (event mapas igenom och kan därför läggas ner i mitt state som array)
        const upcoming = event.filter(events => {
            const eventStart = new Date(events.eventStartDate)
            //jämför startdatum och starttid för de inskickade värderna med dagens datum.
            return (
                eventStart >= today
            )
        });
        setFilterpriority(upcoming);
    }

    // funktion för previous Event (Skulle dagens datum var större än de inskickade datumet 
    //så har eventet redan skett och filterPrioroty sätts till previous)
    let previousEv = () => {
        const today = new Date().getTime();
        // previous får värderna av event.filter, (event mapas igenom och kan därför läggas ner i mitt state som array)
        const previous = event.filter(events => {
            const eventStart = new Date(events.eventStartDate)
            // jämför värderna med dagens datum och tid.
            return (
                eventStart < today
            )
        });
        setFilterpriority(previous);
    }
    useEffect(() => {
        setFilterpriority(event);
    }, [event]);
    return (
        <>
        <Navbar />
        <div className="event-container">
            <h1>Event Calendar</h1>
            <form className="event-form">
                <input className="event-nameInput" onChange={eventNameInput} type="text" placeholder="Event name..." value={eventName} required></input>
                <div className="date-container">
                    <label htmlFor="start-date">Start date</label> <br />
                    <input onChange={startDate} type="date" id="start-date" name="start-date" value={eventStartDate} required></input><br />
                    <label htmlFor="end-date">End date</label> <br />
                    <input onChange={endDate} type="date" id="end-date" name="end-date" value={eventEndDate} required></input>
                </div>
                <div>
                    <label htmlFor="start-time">Start time</label><br />
                    <input onChange={startTime} type="time" id="start-time" name="start-time" value={eventStartTime} required></input><br />
                    <label htmlFor="end-time">End time</label><br />
                    <input onChange={endTime} type="time" id="end-time" name="end-time" value={eventEndTime} required></input>
                </div>
            </form>
            {isEditing === null ? <button className="event-createBtn" onClick={createEvent}>Create Event</button> : <button className="event-saveBtn" onClick={() => { saveEditBtn() }}>Save</button>}
            {/* filter knapp */}
            <select className="event-select" onChange={changeFilter}>
                <option >Filter</option>
                <option >Upcoming events</option>
                <option >Previous events</option>
            </select>

            {filterPriority.length > 0 ? filterPriority.map((events, index) => {
                // kollar om datumet som användaren skickat in har passerat eller ej, 
                const isPast = isEventPast(events.eventStartDate, events.eventStartTime);
                return (
                    // om ett event har datum som passerat dagens datum kommer de få klassnamnet past-event.
                    <div key={index} className={isPast ? 'past-event' : 'future-event'}>
                        <p className="event-title"><strong>{events.eventName}</strong></p>
                        <p><strong>start och slut datum</strong>: <span className="event-dates">{events.eventStartDate} / {events.eventEndDate}</span></p>
                        <p><strong>start och slut tid</strong>: <span className="event-times">{events.eventStartTime} / {events.eventEndTime}</span></p>
                        {/* i min editBtn skickar jag med indexet för varje enskilt eventet */}
                        <div className="event-btns">
                             <button className="event-delBtn" onClick={() => { editBtn(index) }}>Edit</button>
                            {/* delete knapp */}
                            <button className="event-editBtn" onClick={() => { deleteBtn(index) }}>Delete</button>
                        </div>
                    </div>
                );
            }) : <p>No events created.</p>}
        </div>
        </>
    )
}
export default EventCalendar;