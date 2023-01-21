import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { loadBoards } from "../store/board.actions"

export function DropdownBoards({ setDropDown }) {

    const boards = useSelector(storeState => storeState.boardModule.boards)
    const navigate = useNavigate()

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

    function handleLinkClick(ev, boardId) {
        ev.preventDefault()
        navigate(`/board/${boardId}`)
        setDropDown({})
    }

    return (
        <section onClick={(ev) => ev.stopPropagation()} className="dropdown dropdown-boards">
            <label>Your boards</label>
            <ul className="clean-list">
                {boards[0] &&
                    boards.map(board => (
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