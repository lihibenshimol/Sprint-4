import { CardPreview } from "./card-preview";
import { Link } from "react-router-dom"

export function CardList({ cards, groupId }) {
    return (
        <section className="card-list">
            {cards.map(card =>
                <Link to={`g/${groupId}/c/${card.id}`} key={card.id}>
                    <CardPreview card={card} />
                </Link>
            )}
        </section>
    )
}