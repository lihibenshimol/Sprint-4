import { useSelector } from "react-redux"
import filterIcon from '../assets/img/filter.svg'
import starIcon from '../assets/img/star.svg'
import dashboardIcon from '../assets/img/dashboard.svg'
import { useState } from "react"


export function BoardHeader() {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const [editMode, setEditMode] = useState(false)

    if (!board) return <h1>Loading...</h1>
    return (
        <>
            <div className="board-header full">

                <section className="left">
                    <h1 onClick={() => setEditMode(!editMode)} className={"board-header-text" + (editMode ? 'editMode' : '')}>Sprint 4</h1>
                    <input className={"board-name-input"+ (editMode ? 'editMode' : '')} aria-label="Sprint 4" spellCheck="false" dir="auto" value="Sprint 4" />
                    <span className="star-icon-box">
                        <button className="board-header-btn-icon" ><img className="board-header-icon star" width="20px" src={starIcon} alt="favorites" /></button>
                    </span>
                    {board && <div className="board-members">
                        {board.members.map(member =>
                            <div key={member._id} className="member-img"> <img src={member.imgUrl} alt={member.fullname} /></div>
                        )}
                    </div>}
                </section>

                <section className="right">
                    <button className="board-header-btn-icon filter-icon">
                        <img className="board-header-icon filter" src={filterIcon} alt="filter" />
                        Filter
                    </button>
                    <button className="board-header-btn-icon dashboard-icon">
                        <img className="board-header-icon dashboard" src={dashboardIcon} alt="dashboard" />
                        Dashboard
                    </button>
                </section>


            </div>

        </>
    )
}