import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { loadBoards } from "../store/board.actions"

export function DropdownRecent({ setDropDown }) {

    const boards = useSelector(storeState => storeState.boardModule.boards)
    const navigate = useNavigate()
    const dayInMilliseconds = 1000 * 60 * 60 * 24

    const [recentBoards, setRecentBoards] = useState([])

    useEffect(() => {
        setRecentBoards(boards?.filter(board => Date.now() - board.lastViewed < dayInMilliseconds).sort((b1, b2) => b2.lastViewed - b1.lastViewed))
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

    function handleLinkClick(ev, boardId) {
        ev.preventDefault()
        navigate(`/board/${boardId}`)
        setDropDown({})
    }

    return (
        <section onClick={(ev) => ev.stopPropagation()} className="dropdown dropdown-boards">
            <label>Recently viewed</label>
            <ul className="clean-list">
                {recentBoards[0] &&
                    recentBoards.map(board => (
                        <li key={board._id}>
                            <Link to={`/board/${board._id}`} onClick={(ev) => handleLinkClick(ev, board._id)}>
                                <article>
                                    <div style={board.style} className="board-bg">
                                        <span>{board.title.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <h3>{board.title}</h3>
                                </article>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}