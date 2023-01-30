import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import filterIcon from '../assets/img/filter.svg'
import starIcon from '../assets/img/star.svg'
import dashboardIcon from '../assets/img/dashboard.svg'
import { undoBoardUpdate, updateBoard } from "../store/board.actions"
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { HiOutlineMicrophone } from 'react-icons/hi'
import { BsFilter, BsMusicNoteBeamed, BsThreeDots } from 'react-icons/bs'
import { TfiDashboard } from 'react-icons/tfi'
import { MdPersonAddAlt } from 'react-icons/md'
import { utilService } from "../services/util.service"
import { CardSelectDropDown } from "./card/card-select-dropdown"
import { BoardMemberSelect } from "./board-member-select"
import { socketService, SOCKET_EMIT_BOARD_UPDATED } from "../services/socket.service"
import { MusicModal } from "./music-modal"
import { BoardFilter } from "./board-filter"
import { VoiceListener } from "./voice-listener"
import { Link } from "react-router-dom"


export function BoardHeader({ setIsOpenMenu, isOpenMenu, onAddGroup }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const lastUpdatedBoard = useSelector(storeState => storeState.boardModule.lastUpdatedBoard)
    const [editMode, setEditMode] = useState(false)
    const [boardNewTitle, setBoardNewTitle] = useState(board.title)
    const [pos, setPos] = useState({})
    const [dropdownType, setDropdownType] = useState(null)
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const [isMusicModalOpen, setMusicModalOpen] = useState(false)
    const [isFilterMode, setIsFilterMode] = useState(false)
    const [isVoiceMode, setIsVoiceMode] = useState(false)


    useEffect(() => {
        setBoardNewTitle(board.title)
    }, [board])

    async function onStarBoard(ev) {
        ev.stopPropagation()
        board.isStarred = !board.isStarred
        board.starredAt = Date.now()
        try {
            const savedBoard = await updateBoard(board)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Failed to save board ', err)
        }
    }

    async function changeBoardTitle(ev) {
        ev.preventDefault()
        setEditMode(!editMode)
        board.title = boardNewTitle
        try {
            const savedBoard = await updateBoard(board)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Failed to save board ', err)
        }
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
            const savedBoard = await updateBoard(board)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Cant Add the members ', err)
        }
    }

    function onOpenMusicModal() {
        console.log('OPENING')

        setIsOpenMenu(false)
        setMusicModalOpen(prevModalOpen => !prevModalOpen)
    }

    if (!board) return <h1>Loading...</h1>
    return (
        <>
            <MusicModal className={isMusicModalOpen ? '' : 'hidden'} 
            setMusicModalOpen={setMusicModalOpen} />

            {isDropDownOpen && <BoardMemberSelect
                type={dropdownType}
                pos={pos}
                setIsDropDownOpen={setIsDropDownOpen}
                isDropDownOpen={isDropDownOpen}
                addOrDeleteMember={addOrDeleteMember}
            />}

            {isVoiceMode && <VoiceListener
                board={board}
                onOpenMusicModal={onOpenMusicModal}
                onAddGroup={onAddGroup}
                setIsVoiceMode={setIsVoiceMode}
                isVoiceMode={isVoiceMode}
            />}

            {isFilterMode && <BoardFilter
                pos={pos}
                isFilterMode={isFilterMode}
                setIsFilterMode={setIsFilterMode}
            />}

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
                    <span className="line"> </span>
                    {board && <div className="board-members">
                        {board.members?.map(member =>
                            <div key={member._id} className="member-img"> <img src={member.imgUrl} alt={member.fullname} /></div>
                        )}
                    </div>}


                    <button className="board-header-btn-icon invite-icon" onClick={(e) => onSetType(e, 'members')} >
                        <MdPersonAddAlt />
                        Invite
                    </button>

                    <button className="board-header-btn-icon undo-icon"
                        style={{ display: 'block' }}
                        onClick={() => undoBoardUpdate(lastUpdatedBoard)}>
                        Undo
                    </button>
                </section>

                <section className="right">
                    <button onClick={onOpenMusicModal} className="board-header-btn-icon music-icon" style={{ display: 'block' }}>
                        <BsMusicNoteBeamed />
                    </button>
                    <button className="board-header-btn-icon filter-icon"
                        onClick={() => setIsVoiceMode(!isVoiceMode)}>
                        < HiOutlineMicrophone />
                        Tommy
                    </button>
                    <button className="board-header-btn-icon filter-icon"
                        onClick={() => setIsFilterMode(!isFilterMode)}>
                        <BsFilter />
                        Filter
                    </button>

                    <Link to={`dashboard`}>
                        <button className="board-header-btn-icon dashboard-icon">
                            <TfiDashboard />
                            Dashboard
                        </button>
                    </Link>
                    <span className="line">

                    </span>
                    {!isOpenMenu && (<button className="board-header-btn-icon dashboard-icon menu"
                        onClick={() => setIsOpenMenu(!isOpenMenu)}                    >
                        <BsThreeDots />
                    </button>)}
                </section>

            </div>
        </>
    )
}