import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { getGames } from "../game/GameManager"
import { getSingleEvent, updateEvent } from "./EventManager"


export const EditEvent = () => {
    const history = useHistory()
    const {eventId} = useParams()
    const [originalEvent, setOriginalEvent] = useState({game: {id:0}})
    const [currentEvent, setCurrentEvent] = useState({})
    const [allGames, updateGames] = useState([])

    useEffect(() => {
        getGames()
        .then(data => updateGames(data))
        getSingleEvent(eventId)
        .then(data => setOriginalEvent(data))
    }, [])

    useEffect(() => {
        const copy = {...originalEvent}
        copy.description = originalEvent.description
        copy.game = originalEvent.game.id
        copy.date = originalEvent.date
        copy.time = originalEvent.time
        setCurrentEvent(copy)
    }, [originalEvent])

    const changeEventState = (e) => {
        const copy = {...currentEvent}
        if (e.target.name === "description") {
            copy.description = e.target.value
        } else if (e.target.name === "game") {
            copy.game = parseInt(e.target.value)
        } else if (e.target.name === "date") {
            copy.date = e.target.value
        } else if (e.target.name === "time") {
            copy.time = e.target.value
        }

        setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__description">Register New event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="game" required autoFocus className="form-control"
                        onChange={changeEventState}
                            value={currentEvent.game}>
                            {allGames.map(game => {
                                return <option key={`game--${game.id}`} value={game.id}>{game.title}</option>
                            })}

                        </select>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date of Event: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        defaultValue={currentEvent.date}
                        onChange={changeEventState}/>
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time of Event: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        defaultValue={currentEvent.time}
                        onChange={changeEventState}/>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game_id : currentEvent.game
                    }

                    // Send POST request to your API
                    updateEvent(event, parseInt(eventId))
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )



}