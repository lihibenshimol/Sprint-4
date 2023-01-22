import { useEffect } from "react";
import { useSelector } from 'react-redux'
import { loadBoards } from "../store/board.actions";
import { BoardAdd } from "./board-add";
import { BoardPreview } from "./board-preview";

export function BoardList({ addNew = false, boards, type }) {

    return (

        <section className="board-list">
            {type === 'starred' &&
                boards[0] && boards.map(board => (
                    board.isStarred && <BoardPreview board={board} key={board._id} />
                ))
            }

            {!type && boards[0] && boards.map(board => (
                <BoardPreview board={board} key={board._id} />
            ))}

            {addNew && <BoardAdd />}

        </section>

    )
}