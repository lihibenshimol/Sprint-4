import { CardPreview } from "./card-preview";
import { Link } from "react-router-dom"
import { BsPencil } from 'react-icons/bs'


export function CardList(props) {
    const { cards, groupId, innerRef, provided, isDraggingOver, openQuickEditor } = props

    return (
        <section {...provided.droppableProps} ref={innerRef} className={isDraggingOver ? 'card-list drag-over' : 'card-list'}>
            {cards.map((card, idx) =>
                <Link key={card.id} to={`g/${groupId}/c/${card.id}`}>
                    {card.cover && <div className="card-preview-cover" style={{ backgroundColor: card.cover }}> </div>}
                    {/* <button onClick={(ev) => openQuickEditor(ev)} className="quick-edit-btn"> <BsPencil /> </button> */}
                    <CardPreview card={card} groupId={groupId} idx={idx} openQuickEditor={openQuickEditor} />
                </Link>
            )}
            {provided.placeholder}
        </section>
    )
}