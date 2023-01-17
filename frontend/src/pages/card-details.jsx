import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserAvatarPreview } from "../cmps/user-avatar-preview"
import { cardService } from "../services/card.service.local"


export function CardDetails() {
    const { cardId } = useParams()
    const [card, setCard] = useState(null)
    const navigate = useNavigate()
    console.log('cardId: ', cardId)


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

    function lgg() {
        console.log('cardId: ', cardId)
        console.log('card: ', card)
    }

    if (!card) return <div className="loader"></div>


    return <section className="card">
        <button onClick={lgg} className="close-btn">X</button>
        <div className="card-header">
            <span className="icon fa card-icon"></span>
            <h2 className="title">{card.title}</h2>
            <div>
                <p>in group: Testing</p>
            </div>
        </div>
        <div className="flex">
            <div className="main-content">
                <section className="card-details">
                    {card.members.length &&
                        <> 
                        <h3>members</h3>
                        <UserAvatarPreview users={card.members} /> </>}
                    <h3>{card.label.length && card.label}</h3>
                    <h3>{card.checklist}</h3>
                </section>
            </div>
            <div className="side-bar">
                label
                members
            </div>
        </div>

    </section>
}