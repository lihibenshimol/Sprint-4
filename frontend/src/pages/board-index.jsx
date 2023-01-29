import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BoardList } from "../cmps/board-list";
import { socketService, SOCKET_EVENT_NEW_BOARD } from "../services/socket.service";
import { getActionAddBoard, loadBoards, loadStarredBoards } from "../store/board.actions";

export function BoardIndex() {

    const dispatch = useDispatch()
    const {boards, starredBoards} = useSelector(storeState => storeState.boardModule)
    const [recentBoards, setRecentBoards] = useState([])
    const dayInMilliseconds = 1000 * 60 * 60 * 24

    useEffect(() => {
        setRecentBoards(boards?.filter(board => Date.now() - board.lastViewed < dayInMilliseconds).sort((b1, b2) => b2.lastViewed - b1.lastViewed).splice(0, 4))
    }, [boards])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_NEW_BOARD, (board) => {
            dispatch(getActionAddBoard(board))
        })
        getBoards()
    }, [])

    async function getBoards() {
        try {
            loadStarredBoards()
            loadBoards()
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