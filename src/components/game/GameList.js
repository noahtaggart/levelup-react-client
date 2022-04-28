import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getGames } from "./GameManager.js"

export const GameList = (props) => {
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            {
                games.map(game => {
                    return <>
                    <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                    </section><button><Link to={`/games/${game.id}/edit`}>edit</Link></button>
                    </>
                })
            }
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
        </article>
    )
}