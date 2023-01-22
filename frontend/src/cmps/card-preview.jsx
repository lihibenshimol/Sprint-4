import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { BsPencil } from 'react-icons/bs'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { QuickEditor } from "./quick-editor";


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

function doneInCheckList(checklist) {
    let doneTasks = 0
    checklist.todos.forEach(task => {
        if (task.isDone) doneTasks++
    })
    return doneTasks
}

export function CardPreview({ card, idx, groupId }) {
    const [quickEditor, toggleQuickEditor] = useState(false)

    function openQuickEditor(ev) {
        // ev.stopPropagation()
        ev.preventDefault()
        toggleQuickEditor(!quickEditor)
    }

    return (
        <Draggable draggableId={card.id} index={idx}>
            {(provided, snapshot) => (
                <Container
                    provided={provided}
                    innerRef={provided.innerRef}
                    isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
                >
                    <section className="card-title flex">
                        <span>{card.title}</span>
                        <button onClick={(ev) => openQuickEditor(ev)} className="quick-edit-btn"> <BsPencil /> </button>
                    </section>
                    <section className="card-preview-details">
                        {card.checklists && card.checklists.map(checklist => <span className="preview-details-checklist" key={checklist.id}> {doneInCheckList(checklist)}/{checklist.todos.length} <span className="preview-details-checklist-icon"> <IoMdCheckboxOutline /> </span> </span>)}
                        {card.members && <span className="preview-details-members"> {card.members.map(member => <span key={member._id}> <img className="member-img" src={member.imgUrl} alt="" /></span>)} </span>}
                    </section>
                    {quickEditor &&
                        <section onClick={e => e.stopPropagation()}>
                            <QuickEditor
                                card={card}
                                groupId={groupId}
                                openQuickEditor={openQuickEditor}
                                quickEditor={quickEditor} />
                        </section>}
                </Container>
            )}
        </Draggable>
    )
}

