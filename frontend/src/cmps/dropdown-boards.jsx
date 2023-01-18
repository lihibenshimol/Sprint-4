import { useEffect, useState } from "react"
import { boardService } from "../services/board.service.local"
import { BoardPreview } from "./board-preview"

export function DropdownBoards() {

    const [boards, setBoards] = useState([])

    useEffect(() => {
        loadBoards()
    }, [])

    async function loadBoards() {
        try {
            const boards = await boardService.query()
            setBoards(boards)
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
                            <article><h3>{board.title}</h3></article>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}