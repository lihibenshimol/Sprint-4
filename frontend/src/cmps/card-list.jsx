import { CardPreview } from "./card-preview";
import { Link } from "react-router-dom"

export function CardList(props) {
    const { cards, groupId, innerRef, provided } = props
    return (
        <section {...props} ref={innerRef} className="card-list">
            {cards.map((card, idx) =>

                <CardPreview key={card.id} card={card} idx={idx} />
                )}
                {provided.placeholder}
        </section>
    )
}