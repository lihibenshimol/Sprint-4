import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BoardList } from "../cmps/board-list";
import { loadBoards } from "../store/board.actions";

export function BoardIndex() {

    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [starredBoards, setStarredBoards] = useState([])

    useEffect(() => {
        setStarredBoards(boards?.filter(board => board.isStarred).sort((b1, b2) => b1.starredAt - b2.starredAt))
    }, [boards])

    useEffect(() => {
        getBoards()
    }, [])

    async function getBoards() {
        try {
            await loadBoards()
        } catch (err) {
            console.log('Had error fetching boards; ', err)
        }
    }

    return (
        <section className="board-index main-layout">
            <section className="your-boards">

                {starredBoards[0] &&
                    <section className="starred-boards">
                        <h3>Starred boards</h3>
                        <BoardList type={'starred'} boards={starredBoards} />
                    </section>
                }


                <h2>Your boards</h2>
                <BoardList boards={boards} addNew={true} />
            </section>
        </section>
    )
}