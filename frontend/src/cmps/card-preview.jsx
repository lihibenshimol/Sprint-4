

export function CardPreview({cards}){
    return (
        
        <section className="cards-list">
            {cards.map(card => <div className="card-preview" key={card.id}>
                {card.title}
            </div>)}

        </section>
    )
}