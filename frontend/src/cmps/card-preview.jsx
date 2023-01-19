import { Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";


function Container(props) {
    const { children, innerRef, provided } = props
    return <div className="card-preview" ref={innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
    >
        {children}
    </div>
}

export function CardPreview({ card, idx }) {

    return (
        <Draggable draggableId={card.id} index={idx}>
            {(provided) => (
                <Container
                    provided={provided}
                    innerRef={provided.innerRef}
                >
                    <span className="card-title">
                        {card.title}
                    </span>
                </Container>
            )}
        </Draggable>
    )
}

