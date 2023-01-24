import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Loader } from "../cmps/loader"
import { SideBar } from "../cmps/card/card-side-bar"
import { CardDescription } from "../cmps/card/card-description"
import { UserAvatarPreview } from "../cmps/user-avatar-preview"

import { RxCross1 } from 'react-icons/rx';
import { BsTextLeft } from 'react-icons/bs';
import { BiWindow } from 'react-icons/bi';

import { boardService } from "../services/board.service"
import { useSelector } from "react-redux"
import { CheckListList } from "../cmps/card/card-checklist-list"
import { updateBoard } from "../store/board.actions"
import { CardHeader } from "../cmps/card-header"
import { CardSelectDropDown } from "../cmps/card/card-select-dropdown"
import { utilService } from "../services/util.service"
import { CheckAttachments } from "../cmps/card/card-attachment"
import { socketService, SOCKET_EMIT_BOARD_UPDATED } from "../services/socket.service"
import { LabelPreview } from "../cmps/label-preview"



export function CardDetails() {
    const { cardId, groupId } = useParams()
    const [card, setCard] = useState(null)
    const [isDescriptionEdit, setIsDescriptionEdit] = useState(false)
    const [isEditAddTodo, setIsEditAddTodo] = useState(false)

    const [dropdownType, setDropdownType] = useState(null)
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const [pos, setPos] = useState({})

    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const navigate = useNavigate()


    useEffect(() => {
        loadCard()
    }, [cardId, isDescriptionEdit])

    function closeAddTodoEdit() {
        if (!isEditAddTodo) return
        setIsEditAddTodo(!isEditAddTodo)
    }

    function getGroup() {
        const group = board.groups.find(g => g.id === groupId)
        return group.title
    }

    async function loadCard() {
        try {
            const card = await boardService.getCardById(board, groupId, cardId)
            setCard(card)
        } catch (err) {
            console.log('Cant load card')
            // navigate('/')
            throw err
        }
    }

    async function onChangeTitle({ target }) {
        let { innerText } = target

        try {
            const updateCard = { ...card, title: innerText }
            boardService.saveCard(board, groupId, updateCard)
        } catch (err) {
            console.log('Cant edit the Title ', err)
        }
    }

    async function onSaveDesc(desc) {
        try {
            card.desc = desc
            const updateCard = { ...card, desc }
            boardService.saveCard(board, groupId, updateCard)
            setIsDescriptionEdit(!isDescriptionEdit)

        } catch (err) {
            console.log('Cant edit the description ', err)
        }
    }

    async function onSaveCheckList(checklists) {
        try {
            card.checklists = checklists
            const savedBoard = await updateBoard(board)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Cant save the checklist ', err)
        }
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

    async function onSaveAttachment(attachments) {
        try {
            card.attachments = attachments
            const savedBoard = await updateBoard(board)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Cant Add the labels ', err)
        }
    }


    //ADD FUNCTION 

    function addOrDeleteMember(member) {
        if (!card.members) card.members = []
        const memberIdx = card.members.findIndex(m => m._id === member._id)
        if (memberIdx === -1) {
            member.isChecked = true
            card.members.push(member)
        }
        else {
            member.isChecked = false
            card.members.splice(memberIdx, 1)
        }

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

    function addOrDeleteAttachment(attach) {
        if (!card.attachments) card.attachments = []
        const attachIdx = card.attachments.findInx(a => a.id === attach.a)

        if (attachIdx) card.attachments.push(attach)
        else card.attachments.splice(attachIdx, 1)

        const newAttachments = card.attachments
        onSaveAttachment(newAttachments)
    }

    function onSetType(ev, typeToSet) {
        const position = utilService.getPosToDisplay(ev)

        setPos(prevPos => position)
        setDropdownType(prevType => typeToSet)

        if (isDropDownOpen && typeToSet !== dropdownType) return
        setIsDropDownOpen(!isDropDownOpen)
    }



    return <div className="window full">
        <div className="black-bg full" onClick={() => navigate(`/board/${board._id}`)}></div>
        <section className="card" onClick={closeAddTodoEdit}>
            {!card && <Loader className="flex align-center" />}


            {card && (<>
                <a onClick={() => navigate(`/board/${board._id}`)} className={`close-btn ${card.cover ? 'with-cover' : ''}`}>
                    <RxCross1 />
                </a>

                {isDropDownOpen && <CardSelectDropDown
                    type={dropdownType} card={card} pos={pos}
                    setIsDropDownOpen={setIsDropDownOpen}
                    isDropDownOpen={isDropDownOpen}
                    addOrDeleteMember={addOrDeleteMember}
                    addOrDeleteLabel={addOrDeleteLabel}
                    onSaveCover={onSaveCover}
                    onSaveAttachment={onSaveAttachment}
                />}


                {card.cover && <div className="card-cover" style={{ backgroundColor: card.cover }}>

                    <div className="cover-btn hover" onClick={(e) => onSetType(e, 'cover')}>
                        <span><BiWindow /></span>
                        {' Cover'}
                    </div>
                </div>}

                <CardHeader
                    card={card}
                    getGroup={getGroup}
                    onChangeTitle={onChangeTitle} />

                <div className="card-content flex">
                    <div className="main-content">
                        <section className="card-details">
                            {(card.members && card.members.length !== 0) &&
                                <UserAvatarPreview users={card.members} onSetType={onSetType} />}

                            {(card.labels && card.labels.length !== 0) &&
                                <LabelPreview labels={card.labels} onSetType={onSetType} />}
                        </section>


                        <CardDescription
                            card={card}
                            onSaveDesc={onSaveDesc}
                            isDescriptionEdit={isDescriptionEdit}
                            setIsDescriptionEdit={setIsDescriptionEdit} />


                        {card.attachments &&
                            <CheckAttachments
                                onSetType={onSetType}
                                attachments={card.attachments}
                            />
                        }

                        {card.checklists &&
                            <CheckListList
                                onSaveCheckList={onSaveCheckList}
                                checklists={card.checklists}
                                isEditAddTodo={isEditAddTodo}
                                setIsEditAddTodo={setIsEditAddTodo}
                            />
                        }

                        {/* <section className="card-activity">
                            <div className="activity-header">
                                <span><RxActivityLog /></span>
                                <h3>Activity</h3>
                            </div>
                            <p>routable, smart cmp</p>
                        </section> */}
                    </div >

                    <SideBar
                        onSetType={onSetType}
                        card={card}

                        onSaveCheckList={onSaveCheckList}
                    />
                </div >
            </>)}
        </section >
    </div >
}

