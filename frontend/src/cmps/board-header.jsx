import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import filterIcon from '../assets/img/filter.svg'
import starIcon from '../assets/img/star.svg'
import dashboardIcon from '../assets/img/dashboard.svg'
import { updateBoard } from "../store/board.actions"
import { AiFillStar } from 'react-icons/ai'
import { BsFilter } from 'react-icons/bs'
import { TfiDashboard } from 'react-icons/tfi'


export function BoardHeader() {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const [editMode, setEditMode] = useState(false)
    const [boardNewTitle, setBoardNewTitle] = useState(board.title)

    useEffect(() => {
        setBoardNewTitle(board.title)
    }, [board])

    function changeBoardTitle(ev) {
        ev.preventDefault()
        setEditMode(!editMode)
        board.title = boardNewTitle
        updateBoard(board)
    }

    function handleChange({ target }) {
        let { value } = target
        setBoardNewTitle(value)
    }

    if (!board) return <h1>Loading...</h1>
    return (
        <>
            <div className="board-header full">

                <section className="left">
                    <h1 onClick={() => setEditMode(!editMode)} className={"board-header-text" + (editMode ? ' edit-mode' : '')}>{board.title}</h1>
                    <form onSubmit={changeBoardTitle}>
                        <input onChange={handleChange} className={"board-name-input" + (editMode ? ' edit-mode' : '')} aria-label="hello" spellCheck="false" dir="auto" value={boardNewTitle} />
                    </form>
                    <span className="star-icon-box">
                        <button className="board-header-star-btn" >
                       < AiFillStar />
                            </button>
                    </span>
                    {board && <div className="board-members">
                        {board.members?.map(member =>
                            <div key={member._id} className="member-img"> <img src={member.imgUrl} alt={member.fullname} /></div>
                        )}
                    </div>}
                </section>

                <section className="right">
                    <button className="board-header-btn-icon filter-icon">   
                        <BsFilter />
                        Filter
                    </button>
                    <button className="board-header-btn-icon dashboard-icon">
                    <TfiDashboard />
                        Dashboard
                    </button>
                </section>

            </div>
        </>
    )
}