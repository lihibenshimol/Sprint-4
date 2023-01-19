import { CardPreview } from "./card-preview";
import { Link } from "react-router-dom"

export function CardList(props) {
    const { cards, groupId, innerRef, provided } = props
    return (
        <section {...provided.droppableProps} ref={innerRef} className="card-list">
            {cards.map((card, idx) =>
                <Link key={card.id} to={`g/${groupId}/c/${card.id}`}>
                    <CardPreview card={card} idx={idx} />
                </Link>
            )}
            {provided.placeholder}
        </section>
    )
}