import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { BsCreditCard2Back, BsFillPersonFill } from 'react-icons/bs'
import { TiTag } from 'react-icons/ti'
import { RiBankCard2Line } from 'react-icons/ri'
import { RxClock, RxCross2 } from 'react-icons/rx'
import { FiArchive } from 'react-icons/fi'
import { updateBoard } from "../store/board.actions"
import { boardService } from "../services/board.service"
import { useEffect, useRef, useState } from "react"
import { MembersSelect } from "./members-selector"
import { LabelsSelect } from "./label-selector"
import { IoMdCheckboxOutline } from 'react-icons/io'
import { CardSelectDropDown } from "./card/card-select-dropdown"
import { utilService } from "../services/util.service"
import { socketService, SOCKET_EMIT_BOARD_UPDATED } from "../services/socket.service"
import { addActivity } from "../store/activity.actions"


export function QuickEditor({ groupId, card, openQuickEditor, quickEditor, quickEditorPos, doneInCheckList, isTasksDone }) {
    let board = useSelector(storeState => storeState.boardModule.currBoard)
    board = { ...board }
    const [cardToEdit, setCardToEdit] = useState(card)
    const [pos, setPos] = useState({})
    const [dropdownType, setDropdownType] = useState(null)
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const quickEditorBtnsRef = useRef(null)
    const quickEditorTextareaRef = useRef(null)

    useEffect(() => {
        if (quickEditorBtnsRef.current) {
            const rect = quickEditorBtnsRef.current.getBoundingClientRect()
            if (rect.width + quickEditorPos.right >= window.innerWidth) {
                console.log('here');
                quickEditorBtnsRef.current.style = `left:${quickEditorPos.left - rect.width - 20}px; top:${quickEditorPos.top}; direction: rtl `
            } else {
                console.log('there');
                quickEditorBtnsRef.current.style = `left:${quickEditorPos.right + 10}px; `
            }
        }
    }, [quickEditorBtnsRef])

    useEffect(() => {
        if (quickEditorTextareaRef.current) {
            // const rect = quickEditorTextareaRef.current.getBoundingClientRect()
            quickEditorTextareaRef.current.style = `left:${quickEditorPos.left}px; top:${quickEditorPos.top}; `
        }
    }, [quickEditorTextareaRef])

    const navigate = useNavigate()
    const textAreaRef = useRef(null)

    useEffect(() => {
        textAreaRef.current.select()
    }, [])

    function onOpenCard() {
        navigate(`/board/${board._id}/g/${groupId}/c/${card.id}`)
        openQuickEditor(!quickEditor)
    }

    async function onRemoveCard(ev) {
        try {
            const updatedBoard = await boardService.removeCard(board, groupId, card.id)
            const savedBoard = await updateBoard(updatedBoard)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
            openQuickEditor(ev, !quickEditor)
        } catch (err) {
            console.log('err = ', err)
        }
    }

    function handleChange({ target }) {
        let { value } = target
        setCardToEdit((prevCard) => ({ ...prevCard, title: value }))
    }

    async function onSaveCard(ev) {
        ev.preventDefault()
        card.title = cardToEdit.title
        try {
            const savedBoard = await updateBoard(board)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Failed to save board ', err)
        }
        openQuickEditor(ev, !quickEditor)
    }

    async function onSaveMembers(members) {
        try {
            const updateCard = { ...card, members }
            boardService.saveCard(board, groupId, updateCard)
            const savedBoard = await updateBoard(board)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Cant Add the members ', err)
        }
    }

    function addOrDeleteMember(member) {
        if (!card.members) card.members = []
        const memberIdx = card.members.findIndex(m => m._id === member._id)

        if (memberIdx === -1) card.members.push(member)
        else card.members.splice(memberIdx, 1)

        const newMembers = card.members
        onSaveMembers(newMembers)
    }


    async function onSaveMembers(members) {
        try {
            card.members = members
            const savedBoard = await updateBoard(board)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Cant Add the members ', err)
        }
    }

    async function onSaveLabels(labels) {
        try {
            card.labels = labels
            const savedBoard = await updateBoard(board)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Cant Add the labels ', err)
        }
    }

    async function onSaveCover(clr) {
        try {
            card.cover = clr
            const savedBoard = await updateBoard(board)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Cant Add the labels ', err)
        }
    }


    //ADD FUNCTION 

    function addOrDeleteMember(member) {
        if (!card.members) card.members = []
        let msg
        const memberIdx = card.members.findIndex(m => m._id === member._id)
        if (memberIdx === -1) {
            msg = 'joined'
            member.isChecked = true
            card.members.push(member)
        }
        else {
            msg = 'left'
            member.isChecked = false
            card.members.splice(memberIdx, 1)
        }

        const txt = ` ${msg} ${card.title}`
        addActivity({ txt, boardId: board._id, groupId, cardId: card.id, memberId: member._id })

        const newMembers = card.members
        onSaveMembers(newMembers) // TO CHECK IF WE CAN REMOVE THE FUNC
    }

    function addOrDeleteLabel(label) {
        if (!card.labels) card.labels = []
        const labelIdx = card.labels.findIndex(l => l.id === label.id)

        if (labelIdx === -1) card.labels.push(label)
        else card.labels.splice(labelIdx, 1)

        const newLabels = card.labels
        onSaveLabels(newLabels) // TO CHECK IF WE CAN REMOVE THE FUNC
    }

    function onSetType(ev, typeToSet) {
        const position = utilService.getPosToDisplay(ev)

        setPos(prevPos => position)
        setDropdownType(prevType => typeToSet)
        if (typeToSet === dropdownType || !dropdownType) setIsDropDownOpen(!isDropDownOpen)
    }



    return (
        <>
            <div className="black-bg" onClick={(ev) => openQuickEditor(ev, !quickEditor)}></div>
            <div className="quick-editor" onClick={e => e.preventDefault()}>

                <div className="quick-editor-textarea" ref={quickEditorTextareaRef} onClick={(e) => e.preventDefault()}>
                    {card.attachments && <div className="quick-editor-img" style={{ backgroundColor: card.attachments[0].bg }}>
                        <img src={card.attachments[0].imgUrl} alt="" />
                    </div>}
                    {card.cover && !card.attachments && <div className="card-preview-cover" style={{ backgroundColor: card.cover, height: '32px', width: '256px' }}> </div>}
                    <form onSubmit={onSaveCard}>
                        <textarea
                            ref={textAreaRef}
                            onKeyPress={(e) => { if (e.key === 'Enter') onSaveCard(e) }}
                            type="text"
                            name="title"
                            value={cardToEdit.title}
                            onChange={handleChange}
                            autoFocus
                        >
                        </textarea>

                        <section className="quick-editor-card-details">
                            {!!card.checklists.length &&
                                <div style={isTasksDone(card.checklists[0])} className="preview-details-checklist" >
                                    <span className="preview-details-checklist-icon"> <IoMdCheckboxOutline /> </span>
                                    {doneInCheckList(card.checklists[0])}/{card.checklists[0].todos.length}
                                </div>}
                            {card.members && <span className="preview-details-members">{card.members.map(member => <img key={member._id} className="member-img" src={member.imgUrl} alt="" />)}</span>}
                        </section>
                    </form>
                    <button onClick={onSaveCard} className="save-btn">Save</button>
                </div>

                {console.log('quickEditorPos.right = ', quickEditorPos.right)}
                {isDropDownOpen && <CardSelectDropDown
                    type={dropdownType} card={card}
                    pos={quickEditorPos}
                    // pos={pos}
                    setIsDropDownOpen={setIsDropDownOpen}
                    isDropDownOpen={isDropDownOpen}
                    addOrDeleteMember={addOrDeleteMember}
                    addOrDeleteLabel={addOrDeleteLabel}
                    onSaveCover={onSaveCover}
                />}


                <div className="quick-editor-btns" ref={quickEditorBtnsRef} onClick={(e) => e.preventDefault()}>
                    <button onClick={onOpenCard}>
                        <span className="quick-icon"> <BsCreditCard2Back /> </span> Open card
                    </button>

                    <button onClick={(e) => onSetType(e, 'labels')}>
                        <span className="quick-icon"> <TiTag /></span> Edit labels
                    </button>

                    <button onClick={(e) => onSetType(e, 'members')}>
                        <span className="quick-icon"> <BsFillPersonFill /> </span> Change members
                    </button>

                    <button onClick={(e) => onSetType(e, 'cover')}>
                        <span className="quick-icon"> <RiBankCard2Line /> </span> Change cover
                    </button>


                    <button> <span className="quick-icon"> <RxClock /> </span> Edit dates</button>
                    <button onClick={onRemoveCard}> <span className="quick-icon"> <FiArchive /> </span> Delete</button>
                </div>
            </div>
        </>
    )
}
