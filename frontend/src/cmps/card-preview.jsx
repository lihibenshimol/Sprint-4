import { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { BsPencil } from 'react-icons/bs'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { QuickEditor } from "./quick-editor";


function Container(props) {
    const { children, innerRef, provided, isDragging } = props
    // console.log(isDragging)
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
    const [labelsExpanded, setLabelsExpanded] = useState(false)

    // useEffect(() => {
    //     console.log('hee')
    // }, [labelsExpanded])

    function openQuickEditor(ev) {
        // ev.stopPropagation()
        ev.preventDefault()
        toggleQuickEditor(!quickEditor)
    }

    function expandLabels(e) {
        e.preventDefault()
        setLabelsExpanded(!labelsExpanded)
    }

    return (
        <>
            {quickEditor &&
                <section onClick={e => e.stopPropagation()}>
                    <QuickEditor
                        card={card}
                        groupId={groupId}
                        openQuickEditor={openQuickEditor}
                        quickEditor={quickEditor} />
                </section>}

            <Draggable draggableId={card.id} index={idx}>
                {(provided, snapshot) => (
                    <Container
                        provided={provided}
                        innerRef={provided.innerRef}
                        isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
                    >
                       <div>

                       <button onClick={(ev) => openQuickEditor(ev)} className="quick-edit-btn"> <BsPencil /> </button>
                       
                        <section className="card-preview-labels" >
                            {card.labels && card.labels.map(label => <div className={`card-preview-label ${labelsExpanded ? 'expanded' : ''} `} key={label.id}
                                style={{ backgroundColor: label.color }}
                                onClick={expandLabels}>
                                {labelsExpanded ? label.title : ''}
                            </div>)}
                        </section>

                        <section className="card-title flex">
                            <span>{card.title}</span>
                       
                        </section>

                        <section className="card-preview-details">
                            {card.checklists &&
                                card.checklists.map(checklist =>
                                    <div className="preview-details-checklist" key={checklist.id}>
                                        <span className="preview-details-checklist-icon"> <IoMdCheckboxOutline /> </span>
                                        {doneInCheckList(checklist)}/{checklist.todos.length}
                                    </div>)}
                            {card.members &&
                                <span className="preview-details-members"> {card.members.map(member => <span key={member._id}> <img className="member-img" src={member.imgUrl} alt="" /></span>)} </span>}
                        </section>
                        </div>

                    </Container>
                )}
            </Draggable>

        </>
    )
}

