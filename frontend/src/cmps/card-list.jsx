import { useState } from "react";
import { boardService } from "../services/board.service.local";
import { CardPreview } from "./card-preview";


export function CardList({ cards, addCard, group }) {
    const [cardToEdit, setCardToEdit] = useState(boardService.getEmptyCard())


    function onSaveCard(ev) {
        ev.preventDefault()
        addCard(group, cardToEdit)
    }

    function handleChange({ target }) {
        let { value } = target
        setCardToEdit((prevCard) => ({ ...prevCard, title: value }))
    }

    return (
        <div>
            <CardPreview cards={cards} />
            <form onSubmit={onSaveCard}>
                <input type="text"
                    name="title"
                    placeholder="Enter a title for this card..."
                    value={cardToEdit.title}
                    onChange={handleChange}
                />
            </form>
        </div>
    )
}