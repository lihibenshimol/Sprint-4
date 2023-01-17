import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { cardService } from "../services/card.service.local"


export function CardDetails() {
    const [card, setCard] = useState(null)
    const { cardId } = useParams()
    const navigate = useNavigate()


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

    function lg() {
        console.log('cardId: ', cardId)
    }

    if (!card) return <h1>
        loading...
    </h1>
    return <section>
        <button onClick={lg}>Click</button>
        <h2>{card.title}</h2>
        <h3>labels</h3>
        <h3>members</h3>
        <h3>Checklist</h3>
    </section>
}