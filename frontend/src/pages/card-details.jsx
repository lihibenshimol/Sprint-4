import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Loader } from "../cmps/loader"
import { SideBar } from "../cmps/card/card-side-bar"
import { CardDescription } from "../cmps/card/card-description"
import { UserAvatarPreview } from "../cmps/user-avatar-preview"

import { RxActivityLog } from 'react-icons/rx';
import { BsTextLeft } from 'react-icons/bs';
import { boardService } from "../services/board.service.local"
import { useSelector } from "react-redux"
import { CheckListList } from "../cmps/card/card-checklist-list"
import { updateBoard } from "../store/board.actions"



export function CardDetails() {
    const { cardId, groupId } = useParams()
    const [card, setCard] = useState(null)
    const [isDescriptionEdit, setIsDescriptionEdit] = useState(false)
    const [isEditAddTodo, setIsEditAddTodo] = useState(false)
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

    function getGroup() {
        const group = board.groups.find(g => g.id === groupId)
        console.log('group: ', group)
        return group.title
    }


    return <div className="window full">
        <div className="black-bg full" onClick={() => navigate(`/board/${board._id}`)}></div>
        <section className="card" onClick={closeAddTodoEdit}>
            {!card && <Loader className="flex align-center" />}

            {card && (<><button onClick={() => navigate(`/board/${board._id}`)} className="close-btn">X</button>
                <div className="card-header">
                    <span className="icon fa card-icon"></span>
                    <h2 className="title"
                        suppressContentEditableWarning={true}
                        contentEditable={true}
                        onBlur={onChangeTitle}>
                        {card.title}
                    </h2>
                    <div>
                        <p>in group: {getGroup()}</p>
                    </div>
                </div>
                <div className="card-content flex">
                    <div className="main-content">
                        <section className="card-details">
                            {(card.members && card.members.length !== 0) &&
                                <div className="details">
                                    <h5>Members</h5>
                                    <article className="members-container">
                                        <UserAvatarPreview users={card.members} />
                                        <div className="member add-btn fa add"></div>
                                    </article>
                                </div>}

                            {(card.label && card.label.length) &&
                                <div className="details">
                                    <h5>labels</h5>
                                    <article className="labels-container">
                                        {card.label.map(label => {
                                            return <div className="label" key={label}>
                                                <span className=" circle-label"></span>
                                                {label}
                                            </div>
                                        })}
                                        <div className="label fa add hover"></div>
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
                        groupId={groupId}
                        card={card}
                        onSaveCheckList={onSaveCheckList}
                        onSaveMembers={onSaveMembers}
                    />
                </div >
            </>)}
        </section >
    </div >
}


// cards = [{
    //             _id: 'c103',
    //             title: 'Test groups',
    //             label: ['funny'],
    //             members: ['Aviad', 'Shay', 'Lihi'],
    //             checklists: [
    //                 {
    //                     id: 'YEhmF',
    //                     title: 'Checklist',
    //                     todos: [
    //                         {
    //                             id: '212jX',
    //                             title: 'To Do 1',
    //                             isDone: false
    //                         }
    //                     ]
    //                 }
    //             ],
    //         },
    //         {
    //             _id: 'c102',
    //             title: 'Test groups number 2',
    //             label: ['funny', 'important', 'suggested'],
    //             members: ['Lihi', 'Shay'],
    //             checklists: [
    //                 {
    //                     id: 'f11f123',
    //                     title: 'Todos',
    //                     todos: [
    //                         {
    //                             id: '213jX',
    //                             title: 'To Do 2',
    //                             isDone: false
    //                         }
    //                     ]
    //                 }
    //             ],
    //         },
    //         ]
