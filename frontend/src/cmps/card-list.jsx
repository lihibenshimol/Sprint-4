import { CardPreview } from "./card-preview";
import { Link } from "react-router-dom"

export function CardList({ cards }) {
    return (
        <section className="card-list">
            {cards.map(card =>
                <Link to={`c/${card.id}`} key={card.id}>
                    <CardPreview card={card} />
                </Link>
            )}
        </section>
    )
}