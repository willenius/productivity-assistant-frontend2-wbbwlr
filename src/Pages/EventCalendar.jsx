import { useState } from "react";
import { useEffect } from "react";
let EventCalendar = () => {
    // states för alla inputs
    let [eventName, SetEventName] = useState(``);
    let [eventStartDate, setEventStartDate] = useState('')
    let [eventEndDate, setEventEndDate] = useState('')
    let [eventStartTime, setEventStartTime] = useState('')
    let [eventEndTime, setEventEndTime] = useState('')

    //State som array av alla  samlade inputs
    let [event, setEvent] = useState([]);

    // state för editBtn så att ett edit fält ska visas ut.
    let [isEditing, setIsEditing] = useState(null);

    // State för localStorage
    let [items, setItems] = useState([]);

    // Hämtar användare ifrån localstorage
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData) {
            console.log(storedData)
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
            console.log(eventObject)
            //ger updtadetArray värdet av event och eventObject.
            let updatedArray = [...event, eventObject]

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
                // Uppdatera det valda eventet
                return updatedEvent;
            } else {
                return event;
            }
        });
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
    return (
        <div className="event-container">
            <h1>Event Calendar</h1>
            <form>
                <input onChange={eventNameInput} type="text" placeholder="Event name..." value={eventName} required></input>
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
            <button onClick={createEvent}>Create Event</button>

            {event.map((events, index) => {
                // kollar om datumet som användaren skickat in har passerat eller ej, 
                 const isPast = isEventPast(events.eventStartDate, events.eventStartTime);
                return (
                    // om ett event har datum som passerat dagens datum kommer de få klassnamnet past-event.
                    <div key={index} className={isPast ? 'past-event' : ''}>
                        <p><strong>{events.eventName}</strong></p>
                        <p><strong>start och slut datum</strong>: {events.eventStartDate} / {events.eventEndDate}</p>
                        <p><strong>start och slut tid</strong>: {events.eventStartTime} / {events.eventEndTime}</p>
                        {/* i min editBtn skickar jag med indexet för varje enskilt eventet */}
                        <button onClick={() => { editBtn(index) }}>Edit</button>
                        {/* delete knapp */}
                        <button onClick={() => { deleteBtn(index) }}>Delete</button>

                        {isEditing === index ? (
                            <div>
                                {/* här låter jag användaren gör edits på värden som redan skickats in,
                              value ger inputsen värden som tidigare skickats in */}
                                <input onChange={eventNameInput} type="text" placeholder={events.eventName}></input><br />
                                <label htmlFor="start-date">Start date</label> <br />
                                <input onChange={startDate} type="date" id="start-date" name="start-date" value={events.eventStartDate}></input><br />
                                <label htmlFor="end-date">End date</label> <br />
                                <input onChange={endDate} type="date" id="end-date" name="end-date" value={events.eventEndDate}></input><br />
                                <label htmlFor="start-time">Start time</label><br />
                                <input onChange={startTime} type="time" id="start-time" name="start-time" value={events.eventStartTime}></input><br />
                                <label htmlFor="end-time">End time</label><br />
                                <input onChange={endTime} type="time" id="end-time" name="end-time" value={events.eventEndTime}></input>
                                {/* Save knapp för att ta hand om de nya värderna samt göra om isEditing state till null igen. */}
                                <button onClick={() => { saveEditBtn(index) }}>Save</button>
                            </div>
                            //  när man klickat på save knappen så ges isEditing värdet null igen, så att redigera fältet inte syns.
                        ) : (null)

                        }
                    </div>
                )
            })}
        </div>
    )
}
export default EventCalendar;