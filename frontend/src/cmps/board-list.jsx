import { useEffect } from "react";
import { useSelector } from 'react-redux'
import { loadBoards } from "../store/board.actions";
import { BoardAdd } from "./board-add";
import { BoardPreview } from "./board-preview";

export function BoardList({ addNew = false }) {

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

        <section className="board-list">

            {boards[0] && boards.map(board => (
                <BoardPreview board={board} key={board._id} />
            ))}
            {addNew && <BoardAdd />}
        </section>
    )
}