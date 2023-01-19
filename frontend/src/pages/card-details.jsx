import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { cardService } from "../services/card.service.local"

import { Loader } from "../cmps/loader"
import { SideBar } from "../cmps/card/card-side-bar"
import { CardDescription } from "../cmps/card/card-description"
import { UserAvatarPreview } from "../cmps/user-avatar-preview"

import { RxActivityLog } from 'react-icons/rx';
import { BsTextLeft } from 'react-icons/bs';
import { boardService } from "../services/board.service.local"
import { useSelector } from "react-redux"



export function CardDetails() {
    const { cardId, groupId } = useParams()
    const [card, setCard] = useState(null)
    const [isDescriptionEdit, setIsDescriptionEdit] = useState(false)
    const navigate = useNavigate()
    const board = useSelector(storeState => storeState.boardModule.currBoard)


    useEffect(() => {
        loadCard()
    }, [cardId, isDescriptionEdit])

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

    async function onSaveDesc(desc) {
        try {
            // const card = await boardService.getCardById(board, groupId, cardId)
            const updateCard = { ...card, desc }
            boardService.saveCard(board, groupId, updateCard)
            setIsDescriptionEdit(!isDescriptionEdit)
            // navigate(`/board/${board._id}/g/${groupId}/c/${cardId}`)

        } catch (err) {
            console.log('Cant edit the description ', err)
        }
    }

    return <div className="window full">
        {!card && <Loader className="flex align-center" />}
        <section className="card">
            {card && (<><button onClick={() => navigate(`/board/${board._id}`)} className="close-btn">X</button>
                <div className="card-header">
                    <span className="icon fa card-icon"></span>
                    <h2 className="title">{card.title}</h2>
                    <div>
                        <p>in group: Testing</p>
                    </div>
                </div>
                <div className="card-content flex">
                    <div className="main-content">
                        <section className="card-details">
                            {(card.members && card.members.length) &&
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

                            <h3>{card.checklist && card.checklist}</h3>
                        </section>

                        <section className="card-description">
                            <div className="description-header">
                                <span><BsTextLeft /></span>
                                <h3>Description</h3>
                                {!isDescriptionEdit && <button onClick={setIsDescriptionEdit}>Edit</button>}
                            </div>
                            <CardDescription card={card}
                                onSaveDesc={onSaveDesc}
                                isDescriptionEdit={isDescriptionEdit}
                                setIsDescriptionEdit={setIsDescriptionEdit} />
                        </section>

                        {card.checklist && (
                            <section className="card-checklist">
                                <div className="checklist-header">
                                    <span><BsTextLeft /></span>
                                    <h3>Description</h3>
                                </div>
                                {card.describe && <p>{card.describe}</p>}
                            </section>)}

                        <section className="card-activity">
                            <div className="activity-header">
                                <span><RxActivityLog /></span>
                                <h3>Activity</h3>
                            </div>
                            <p>routable, smart cmp</p>
                        </section>
                    </div >
                    <SideBar />
                </div >
            </>)}
        </section >
    </div>
}


   // cards = [{
    //     _id: 'c103',
    //     title: 'Test groups',
    //     label: ['funny'],
    //     members: ['Aviad', 'Shay', 'Lihi'],
    //     describe: '',
    //     checklists: [
    //         {
    //             id: 'YEhmF',
    //             title: 'Checklist',
    //             todos: [
    //                 {
    //                     id: '212jX',
    //                     title: 'To Do 1',
    //                     isDone: false
    //                 }
    //             ]
    //         }
    //     ]}]
