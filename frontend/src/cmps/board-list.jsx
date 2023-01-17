import { useEffect, useState } from "react";
import { boardService } from "../services/board.service.local";
import { BoardPreview } from "./board-preview";


export function BoardList({ addNew = false }) {

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
        <section className="board-list">
            {addNew && 
                <article className="add-board"><span>Create new board</span></article>
            }
            {boards[0] && boards.map(board => (
                <BoardPreview board={board} key={board._id} />
            ))}
        </section>
    )
}