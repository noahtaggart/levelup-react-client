import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { getGameTypes, getSingleGame, updateGame } from './GameManager.js'   

export const EditGame = () => {
    const history = useHistory()
    const {gameId} = useParams()
    const [originalGame, setOriginalGame] = useState({})
    const [currentGame, setCurrentGame] = useState({})
    const [gameTypes, setGameTypes] = useState([])
    

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */

    useEffect(() => {
        getGameTypes()
        .then(data => setGameTypes(data))
        getSingleGame(gameId)
        .then(data => setOriginalGame(data))
    }, [])

    useEffect(() => {
        const copy = {}
        copy.title = originalGame.title
        copy.maker = originalGame.maker
        copy.skillLevel = parseInt(originalGame.skill_level)
        copy.numberOfPlayers = originalGame.number_of_players
        copy.gameTypeId = originalGame.game_type_id
        setCurrentGame(copy)
    }, [originalGame])




    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = {...currentGame}
        if (domEvent.target.name === "title") {
            copy.title = domEvent.target.value
        } else if (domEvent.target.name === "maker") {
            copy.maker = domEvent.target.value
        } else if (domEvent.target.name === "numberOfPlayers") {
            copy.numberOfPlayers = parseInt(domEvent.target.value)
        } else if (domEvent.target.name === "skillLevel") {
            copy.skillLevel = parseInt(domEvent.target.value)
        } else if (domEvent.target.name === "gameTypeId") {
            copy.gameTypeId = parseInt(domEvent.target.value)
        }
            
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="integer" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="range" min="1" max="10" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" required autoFocus className="form-control"
                        defaultValue={currentGame.gameTypeId}
                        onChange={changeGameState}>
                            {gameTypes.map(gameType => {
                                return <option key={`gameType--${gameType.id}`} value={gameType.id}>{gameType.label}</option>
                            })}

                        </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    updateGame(game, gameId)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}