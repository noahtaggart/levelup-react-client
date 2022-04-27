import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createEvent } from "./EventManager"
import { getGames } from "../game/GameManager"


export const EventForm = () => {
    const history = useHistory()



    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        game: null,
        description:"",
        organizer: parseInt(localStorage.getItem("token"))
    })

    const [allGames, updateGames] = useState([])

    useEffect(() => {
        getGames()
        .then(data => updateGames(data))
    }, [])

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
                        defaultValue={currentEvent.game}
                        onChange={changeEventState}>
                            <option value="0" hidden>Select a game...</option>
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
                        game_id : currentEvent.game,
                        organizer: currentEvent.organizer
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}