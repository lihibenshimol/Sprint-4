import { Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";


function Container(props) {
    const { children, innerRef, provided, isDragging } = props
    console.log(isDragging)
    return <div className={isDragging ? 'card-preview dragging' : 'card-preview'} ref={innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
    >
        {children}
    </div>
}

export function CardPreview({ card, idx }) {

    return (
        <Draggable draggableId={card.id} index={idx}>
            {(provided, snapshot) => (
                <Container
                    provided={provided}
                    innerRef={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <span className="card-title">
                        {card.title}
                    </span>
                </Container>
            )}
        </Draggable>
    )
}

