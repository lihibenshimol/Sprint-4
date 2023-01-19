export function CardPreview({ card }) {
    return (
        <div className="card-preview" key={card.id}>
            <span className="card-title">
                {card.title}
            </span>
        </div>

    )
}