export function CardPreview({ cards }) {
    return (
        <section className="cards-list">

            {cards.map(card => <div className="card-preview" key={card.id}>
                <span className="card-title">
                    {card.title}
                </span>
            </div>)}

        </section>
    )
}