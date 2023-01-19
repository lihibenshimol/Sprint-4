import { Link } from "react-router-dom";


export function CardPreview({ cards }) {

    return (
        <section className="cards-list">
            {cards.map(card => <Link key={card.id} to={`card/${card.id}`}>
                <div className="card-preview" >
                    <span className="card-title">
                        {card.title}
                    </span>
                </div>
            </Link>
            )}

        </section>
    )
}