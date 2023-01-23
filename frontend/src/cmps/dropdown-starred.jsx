import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { loadBoards, updateBoard } from "../store/board.actions"

import starredImg from '../assets/img/starred-img.svg'

export function DropdownStarred({ setDropDown }) {

    const navigate = useNavigate()
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

    function handleLinkClick(ev, boardId) {
        ev.preventDefault()
        navigate(`/board/${boardId}`)
        setDropDown({})
    }

    function onStarBoard(ev, board) {
        ev.stopPropagation()
        ev.preventDefault()
        board.isStarred = !board.isStarred
        board.starredAt = Date.now()
        updateBoard(board)
    }

    return (
        <section onClick={(ev) => ev.stopPropagation()} className="dropdown dropdown-boards dropdown-starred">
            {starredBoards[0] &&
                <ul className="clean-list">
                    {starredBoards.map(board => (
                        <li key={board._id}>
                            <Link to={`/board/${board._id}`} onClick={(ev) => handleLinkClick(ev, board._id)}>
                                <article>
                                    <div style={board.style} className="board-bg">
                                        <span>{board.title.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <h3>{board.title}</h3>
                                    <i onClick={(ev) => onStarBoard(ev, board)} className={board.isStarred ? 'fa-regular star starred' : 'fa-regular star'}></i>
                                </article>
                            </Link>
                        </li>
                    ))}
                </ul>
            }

            {!starredBoards[0] &&
                <>
                    <img className="starred-img" src={starredImg} />
                    <p>Star important boards to access them quickly and easily.</p>
                </>
            }
        </section>
    )
}