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



export function CardDetails() {
    const { cardId, groupId } = useParams()
    const [card, setCard] = useState(null)
    const [isDescriptionEdit, setIsDescriptionEdit] = useState(false)
    const [isEditAddTodo, setIsEditAddTodo] = useState(false)

    const [membersSelect, openMembersSelect] = useState(false)
    const [labelsSelect, openLabelsSelect] = useState(false)
    const [coverSelect, openCoverSelect] = useState(false)


    const board = useSelector(storeState => storeState.boardModule.currBoard)

    const navigate = useNavigate()


    useEffect(() => {
        loadCard()
    }, [cardId, isDescriptionEdit])

    function closeAddTodoEdit() {
        if (!isEditAddTodo) return
        setIsEditAddTodo(!isEditAddTodo)
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


    function getGroup() {
        const group = board.groups.find(g => g.id === groupId)
        return group.title
    }


    return <div className="window full">
        <div className="black-bg full" onClick={() => navigate(`/board/${board._id}`)}></div>
        <section className="card" onClick={closeAddTodoEdit}>
            {!card && <Loader className="flex align-center" />}


            {card && (<>
                <a onClick={() => navigate(`/board/${board._id}`)} className={`close-btn ${card.cover ? 'with-cover' : ''}`}>
                    <RxCross1 />
                </a>


                {card.cover && <div className="card-cover" style={{ backgroundColor: card.cover }}>
                    <div className="cover-btn hover" onClick={() => openCoverSelect(!coverSelect)}>
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
                                            onClick={() => openMembersSelect(!membersSelect)}></div>
                                    </article>
                                </div>}

                            {(card.labels && card.labels.length !== 0) &&
                                <div className="details">
                                    <h5>labels</h5>
                                    <article className="labels-container">
                                        {card.labels.map(label => {
                                            return <div className="label hover" style={{ backgroundColor: label.color + '40' }}
                                                key={label.id} onClick={() => openLabelsSelect(!labelsSelect)}>
                                                <span className=" circle-label" style={{ backgroundColor: label.color }}></span>
                                                {label.title}
                                            </div>
                                        })}
                                        <div className="label fa add hover"
                                            onClick={() => openLabelsSelect(!labelsSelect)}></div>
                                    </article>
                                </div>}

                        </section>

                        <section className="card-description">
                            <div className="section-header">
                                <span><BsTextLeft /></span>
                                <h3>Description</h3>
                                {!isDescriptionEdit && <button onClick={setIsDescriptionEdit}>Edit</button>}
                            </div>
                            <CardDescription card={card}
                                onSaveDesc={onSaveDesc}
                                isDescriptionEdit={isDescriptionEdit}
                                setIsDescriptionEdit={setIsDescriptionEdit} />
                        </section>

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
                        card={card}
                        membersSelect={membersSelect}
                        openMembersSelect={openMembersSelect}
                        labelsSelect={labelsSelect}
                        openLabelsSelect={openLabelsSelect}
                        coverSelect={coverSelect}
                        openCoverSelect={openCoverSelect}

                        onSaveCover={onSaveCover}
                        onSaveLabels={onSaveLabels}
                        onSaveCheckList={onSaveCheckList}
                        onSaveMembers={onSaveMembers}
                    />
                </div >
            </>)}
        </section >
    </div >
}

