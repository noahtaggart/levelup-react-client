import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description} by {event.organizer_id.user.first_name} {event.organizer_id.user.last_name}</div>
                        <div className="event__skillLevel">Skill level is {event.game_id.skill_level}</div>
                    </section>
                })
            }
        </article>
    )
}