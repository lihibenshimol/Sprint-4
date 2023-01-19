import { Link } from "react-router-dom";


export function CardPreview({ card }) {

    return (
        <div className="card-preview" >
            <span className="card-title">
                {card.title}
            </span>
        </div>
    )
}

