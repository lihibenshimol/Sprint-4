import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BoardList } from "../cmps/board-list";
import { loadBoards } from "../store/board.actions";

export function BoardIndex() {

    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [starredBoards, setStarredBoards] = useState([])
    const [recentBoards, setRecentBoards] = useState([])
    const dayInMilliseconds = 1000 * 60 * 60 * 24

    useEffect(() => {
        setStarredBoards(boards?.filter(board => board.isStarred).sort((b1, b2) => b1.starredAt - b2.starredAt))
        setRecentBoards(boards?.filter(board => Date.now() - board.lastViewed < dayInMilliseconds).sort((b1, b2) => b1.lastViewed - b2.lastViewed))
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
                        <h3><i className="fa-regular star"></i>Starred boards</h3>
                        <BoardList boards={starredBoards} />
                    </section>
                }

                {recentBoards[0] &&
                    <section className="recent-boards">
                        <h3><i className="fa-regular clock"></i>Recently viewed</h3>
                        <BoardList type={'recent'} boards={recentBoards} />
                    </section>
                }

                <section>
                    <h2>Your boards</h2>
                    <BoardList boards={boards} addNew={true} />
                </section>

            </section>
        </section>
    )
}