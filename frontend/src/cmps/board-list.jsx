import { useEffect, useState } from "react";
import { boardService } from "../services/board.service.local";
import { BoardAdd } from "./board-add";
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
            {addNew && <BoardAdd />}
            {boards[0] && boards.map(board => (
                <BoardPreview board={board} key={board._id} />
            ))}
        </section>
    )
}