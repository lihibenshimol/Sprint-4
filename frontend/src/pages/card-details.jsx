import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { SideBar } from "../cmps/side-bar"
import { UserAvatarPreview } from "../cmps/user-avatar-preview"
import { cardService } from "../services/card.service.local"
import { BsTextLeft } from 'react-icons/bs';
import { RxActivityLog } from 'react-icons/rx';


export function CardDetails() {
    const { cardId } = useParams()
    const [card, setCard] = useState(null)
    const [isDescriptionEdit, setIsDescriptionEdit] = useState('')
    const navigate = useNavigate()
    console.log('cardId: ', cardId)

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


    useEffect(() => {
        // if (card.describe) setIsDescriptionEdit(card.describe)
    }, [])

    useEffect(() => {
        loadCard()
    }, [cardId])

    async function loadCard() {
        try {
            const card = await cardService.getById(cardId)

            setCard(card)
        } catch (err) {
            console.log('Cant load card')
            // navigate('/')
            throw err
        }
    }


    if (!card) return <div className="loader"></div>


    return <div className="window full">
        <section className="card">
            <button className="close-btn">X</button>
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
                        {card.members.length &&
                            <div className="details">
                                <h5>Members</h5>
                                <article className="members-container">
                                    <UserAvatarPreview users={card.members} />
                                    <div className="member add-btn fa add"></div>
                                </article>
                            </div>}

                        {card.label.length &&
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
                        </div>
                        {card.describe && <p>{card.describe}</p>}
                        {!card.describe && <input></input>}
                    </section>

                    {card.checklist && (<section className="card-checklist">
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
        </section >
    </div>
}