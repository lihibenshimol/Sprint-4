import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import filterIcon from '../assets/img/filter.svg'
import starIcon from '../assets/img/star.svg'
import dashboardIcon from '../assets/img/dashboard.svg'
import { updateBoard } from "../store/board.actions"
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BsFilter } from 'react-icons/bs'
import { TfiDashboard } from 'react-icons/tfi'
import { MdPersonAddAlt } from 'react-icons/md'
import { utilService } from "../services/util.service"
import { CardSelectDropDown } from "./card/card-select-dropdown"
import { BoardMemberSelect } from "./board-member-select"


export function BoardHeader() {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const [editMode, setEditMode] = useState(false)
    const [boardNewTitle, setBoardNewTitle] = useState(board.title)
    const [pos, setPos] = useState({})
    const [dropdownType, setDropdownType] = useState(null)
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)

    useEffect(() => {
        setBoardNewTitle(board.title)
    }, [board])

    function onStarBoard(ev) {
        ev.stopPropagation()
        board.isStarred = !board.isStarred
        board.starredAt = Date.now()
        updateBoard(board)
    }

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

    function onSetType(ev, typeToSet) {
        const position = utilService.getPosToDisplay(ev)

        setPos(prevPos => position)
        setDropdownType(prevType => typeToSet)
        if (typeToSet === dropdownType || !dropdownType) setIsDropDownOpen(!isDropDownOpen)
    }

    function addOrDeleteMember(member) {
        if (!board.members) board.members = []
        const memberIdx = board.members.findIndex(m => m._id === member._id)

        if (memberIdx === -1) board.members.push(member)
        else board.members.splice(memberIdx, 1)

        const newMembers = board.members
        onSaveMembers(newMembers)
    }

    async function onSaveMembers(members) {
        try {
            board.members = members
            updateBoard(board)
        } catch (err) {
            console.log('Cant Add the members ', err)
        }
    }

    if (!board) return <h1>Loading...</h1>
    return (
        <>
            {isDropDownOpen && <BoardMemberSelect
                    type={dropdownType}
                    pos={pos}
                    setIsDropDownOpen={setIsDropDownOpen}
                    isDropDownOpen={isDropDownOpen}
                    addOrDeleteMember={addOrDeleteMember}

                />}
            {/* {isDropDownOpen && <CardSelectDropDown
                    type={dropdownType}
                    pos={pos}
                    setIsDropDownOpen={setIsDropDownOpen}
                    isDropDownOpen={isDropDownOpen}
                    addOrDeleteMember={addOrDeleteMember}

                />} */}

            <div className="board-header full">


                <section className="left">
                    <h1 onClick={() => setEditMode(!editMode)} className={"board-header-text" + (editMode ? ' edit-mode' : '')}>{board.title}</h1>
                    <form onSubmit={changeBoardTitle}>
                        <input onChange={handleChange} className={"board-name-input" + (editMode ? ' edit-mode' : '')} aria-label="hello" autoFocus spellCheck="false" dir="auto" value={boardNewTitle} />
                    </form>
                    <span className="star-icon-box">
                        <button className="board-header-star-btn" onClick={onStarBoard} >
                            {board.isStarred ? < AiFillStar /> : < AiOutlineStar />}
                        </button>
                    </span>
                    {board && <div className="board-members">
                        {board.members?.map(member =>
                            <div key={member._id} className="member-img"> <img src={member.imgUrl} alt={member.fullname} /></div>
                        )}
                    </div>}


                    <button className="board-header-btn-icon invite-icon" onClick={(e) => onSetType(e, 'members')} >
                        <MdPersonAddAlt />
                      Invite
                    </button>
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