import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { boardService } from "../services/board.service.local"
import { loadBoards } from "../store/board.actions"
import { BoardPreview } from "./board-preview"

export function DropdownBoards() {

    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        getBoards()
    }, [])

    async function getBoards() {
        try {
            const boards = await loadBoards()
        } catch (err) {
            console.log('Had error fetching boards; ', err)
        }
    }

    return (
        <section onClick={(ev) => ev.stopPropagation()} className="dropdown dropdown-boards">
            <ul className="clean-list">
                {boards[0] &&
                    boards.map(board => (
                        <li key={board._id}>
                            <Link to={`/board/${board._id}`}>
                                <article><h3>{board.title}</h3></article>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}