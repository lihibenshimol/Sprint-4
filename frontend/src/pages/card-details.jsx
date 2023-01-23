import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Loader } from "../cmps/loader"
import { SideBar } from "../cmps/card/card-side-bar"
import { CardDescription } from "../cmps/card/card-description"
import { UserAvatarPreview } from "../cmps/user-avatar-preview"

import { RxCross1 } from 'react-icons/rx';
import { BsTextLeft } from 'react-icons/bs';
import { BiWindow } from 'react-icons/bi';

import { boardService } from "../services/board.service.local"
import { useSelector } from "react-redux"
import { CheckListList } from "../cmps/card/card-checklist-list"
import { updateBoard } from "../store/board.actions"
import { CardHeader } from "../cmps/card-header"
import { CardSelectDropDown } from "../cmps/card/card-select-dropdown"
import { utilService } from "../services/util.service"
import { CheckAttachments } from "../cmps/card/card-attachment"



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
            updateBoard(board)
        } catch (err) {
            console.log('Cant save the checklist ', err)
        }
    }

    async function onSaveMembers(members) {
        try {
            card.members = members
            updateBoard(board)
        } catch (err) {
            console.log('Cant Add the members ', err)
        }
    }

    async function onSaveLabels(labels) {
        try {
            card.labels = labels
            updateBoard(board)
        } catch (err) {
            console.log('Cant Add the labels ', err)
        }
    }

    async function onSaveCover(clr) {
        try {
            card.cover = clr
            updateBoard(board)
        } catch (err) {
            console.log('Cant Add the labels ', err)
        }
    }

    async function onChangeAttachment(attachments) {
        console.log('card: ', card)

        try {
            card.attachments = attachments
            updateBoard(board)
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
                                <div className="details">
                                    <h5>Members</h5>
                                    <article className="members-container">
                                        <UserAvatarPreview users={card.members} />
                                        <div className="member add-btn fa add"
                                            onClick={(e) => onSetType(e, 'members')}></div>
                                    </article>
                                </div>}

                            {(card.labels && card.labels.length !== 0) &&
                                <div className="details">
                                    <h5>labels</h5>
                                    <article className="labels-container">
                                        {card.labels.map(label => {
                                            return <div className="label hover" style={{ backgroundColor: label.color + '40' }}
                                                key={label.id}
                                                onClick={(e) => onSetType(e, 'labels')}>
                                                <span className=" circle-label" style={{ backgroundColor: label.color }}></span>
                                                {label.title}
                                            </div>
                                        })}
                                        <div className="label fa add hover"
                                            onClick={(e) => onSetType(e, 'labels')}></div>
                                    </article>
                                </div>}
                        </section>

                        <section className="card-description">
                            <div className="section-header">
                                <span><BsTextLeft /></span>
                                <h3>Description</h3>
                                {!isDescriptionEdit && <button onClick={setIsDescriptionEdit}>Edit</button>}
                            </div>

                            <CardDescription
                                card={card}
                                onSaveDesc={onSaveDesc}
                                isDescriptionEdit={isDescriptionEdit}
                                setIsDescriptionEdit={setIsDescriptionEdit} />
                        </section>


                        {card &&
                            <CheckAttachments
                                onSetType={onSetType}
                                attachments={card.attachments}
                                onChangeAttachment={onChangeAttachment}
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
                        card={card} pos={pos} type={dropdownType}
                        isDropDownOpen={isDropDownOpen}

                        setIsDropDownOpen={setIsDropDownOpen}
                        addOrDeleteMember={addOrDeleteMember}
                        addOrDeleteLabel={addOrDeleteLabel}
                        onSaveCover={onSaveCover}
                        onSaveCheckList={onSaveCheckList}

                    />
                </div >
            </>)}
        </section >
    </div >
}

