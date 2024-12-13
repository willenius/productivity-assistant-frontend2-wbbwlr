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
    let [isEditing,setIsEditing] = useState(null);

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
            let updatedArray = [...event]
            updatedArray.push(eventObject);
            console.log(updatedArray)
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
        setIsEditing(index)
    }

    // save knapp som gör isEditing state till null igen så att edit fältet inte längre visas,
    // uppdaterar även event state med det nya inputsen.
    let saveEditBtn = (index) => {

        //skickar in de nya inputs värden till event state.
        const updatedEvent = {
            eventName,
            eventStartDate,
            eventEndDate,
            eventStartTime,
            eventEndTime,
          };
        console.log(updatedEvent,index)
        // // Skicka uppdaterade event till föräldern ---------------
        // setEvent(updatedEvent, index); --------------------

        setIsEditing(null);

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
                return (
                    <div key={index}>
                        <p><strong>{events.eventName}</strong></p>
                        <p><strong>start och slut datum</strong>: {events.eventStartDate} / {events.eventEndDate}</p>
                        <p><strong>start och slut tid</strong>: {events.eventStartTime} / {events.eventEndTime}</p>
                        {/* i min editBtn skickar jag med indexet för varje enskilt eventet */}
                        <button onClick={() => {editBtn(index)}}>Edit</button>
                        
                        {isEditing === index ?  (
                             <div>
                             {/* här låter jag användaren gör edits på värden som redan skickats in,
                              defaultValue ger inputsen värden som tidigare skickats in */}
                             <input  onChange={eventNameInput} type="text" placeholder={events.eventName}></input><br/>
                             <label htmlFor="start-date">Start date</label> <br/>
                             <input onChange={startDate} type="date" id="start-date" name="start-date" defaultValue={events.eventStartDate}></input><br/>
                             <label htmlFor="end-date">End date</label> <br/>
                             <input onChange={endDate} type="date" id="end-date" name="end-date" defaultValue={events.eventEndDate}></input><br/>
                             <label htmlFor="start-time">Start time</label><br />
                             <input onChange={startTime} type="time" id="start-time" name="start-time" defaultValue={events.eventStartTime}></input><br />
                             <label htmlFor="end-time">End time</label><br />
                             <input onChange={endTime} type="time" id="end-time" name="end-time" defaultValue={events.eventEndTime}></input>
                             {/* Save knapp för att ta hand om de nya värderna samt göra om isEditing state till null igen. */}
                             <button onClick={() =>{saveEditBtn(index)}}>Save</button>
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