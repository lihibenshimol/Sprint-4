import { Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";


function Container(props) {
    const { children, innerRef } = props
    return <div ref={innerRef} {...props} >
        {children}
    </div>
}

export function CardPreview({ card, idx }) {

    return (
        <Draggable draggableId={card.id} index={idx}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    innerRef={provided.innerRef}
                >
                    <div className="card-preview" >
                        <span className="card-title">
                            {card.title}
                        </span>
                    </div>
                </Container>
            )}
        </Draggable>
    )
}

