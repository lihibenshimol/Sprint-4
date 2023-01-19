import { CardPreview } from "./card-preview";
import { Link } from "react-router-dom"

export function CardList(props) {
    const { cards, groupId, innerRef, provided, isDraggingOver } = props
    return (
        <section {...provided.droppableProps} ref={innerRef} className={isDraggingOver ? 'card-list drag-over' : 'card-list'}>
            {cards.map((card, idx) =>
                <Link key={card.id} to={`g/${groupId}/c/${card.id}`}>
                    <CardPreview card={card} groupId={groupId} idx={idx} />
                </Link>
            )}
            {provided.placeholder}
        </section>
    )
}