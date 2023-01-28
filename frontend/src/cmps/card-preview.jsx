import { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { BsPencil, BsTextLeft } from 'react-icons/bs'
import { GrAttachment } from 'react-icons/gr'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { useDispatch, useSelector } from "react-redux";
import { utilService } from "../services/util.service";
import { store } from "../store/store";
import { EXPAND_LABELS, UNEXPAND_LABELS } from "../store/system.reducer";
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


export function CardPreview({ card, idx, groupId }) {
    const [quickEditor, toggleQuickEditor] = useState(false)
    const { labelsExpanded } = useSelector(storeState => storeState.systemModule)
    const dispatch = useDispatch()
    const [quickEditorPos, setQuickEditorPos] = useState({})
    const dropdownRef = useRef(null)

    useEffect(() => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect()
            if (rect.width + quickEditorPos.right >= window.innerWidth) {
                dropdownRef.current.style = `left:${quickEditorPos.left - rect.width - 10}px; top:${quickEditorPos.top}; direction: rtl `
            } else {
                dropdownRef.current.style = `left:${quickEditorPos.right + 10}px; `
            }
        }
    }, [dropdownRef])

    function doneInCheckList(checklist) {
        let doneTasks = 0
        checklist.todos.forEach(task => {
            if (task.isDone) doneTasks++
        })
        return doneTasks
    }

    function isTasksDone(checklist) {
        let doneTasks = 0
        checklist.todos.forEach(task => {
            if (task.isDone) doneTasks++
        })
        if (checklist.todos.length / doneTasks === 1) {
            return { backgroundColor: '#61bd4f', color: '#ffffff' }
        } else {
            return { backgroundColor: 'transparent' }
        }
    }

    function openQuickEditor(ev) {
        ev.preventDefault()
        const pos = utilService.getPosToDisplay(ev)
        setQuickEditorPos(pos)
        toggleQuickEditor(!quickEditor)
    }

    function expandLabels(e) {
        e.preventDefault()
        if (!labelsExpanded) dispatch({ type: EXPAND_LABELS })
        else dispatch({ type: UNEXPAND_LABELS })

    }

    return (
        <>
            {quickEditor &&
                <section onClick={e => e.stopPropagation()}>
                    <QuickEditor
                        card={card}
                        groupId={groupId}
                        openQuickEditor={openQuickEditor}
                        quickEditor={quickEditor}
                        quickEditorPos={quickEditorPos}
                        isTasksDone={isTasksDone}
                        doneInCheckList={doneInCheckList}
                    />
                </section>}

            <Draggable draggableId={card.id} index={idx}>
                {(provided, snapshot) => (
                    <Container
                        provided={provided}
                        innerRef={provided.innerRef}
                        isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
                    >
                        <div className="card-preview-container">
                            {card.attachments && <div className="card-preview-img" style={{ backgroundColor: card.attachments[0].bg }}>
                                <img src={card.attachments[0].imgUrl} alt="" />
                            </div>}
                            {card.cover && !card.attachments && <div className="card-preview-cover" style={{ backgroundColor: card.cover, padding: 0, width: '100%' }}> </div>}
                            <button onClick={(ev) => openQuickEditor(ev)} className="quick-edit-btn"> <BsPencil /> </button>
                            <div className="card-preview-body">
                                {!!card.labels.length && <section className="card-preview-labels">
                                    {card.labels?.map(label => <div className={`card-preview-label ${labelsExpanded ? 'expanded' : ''} `} key={label.id}
                                        style={{ backgroundColor: label.color }}
                                        onClick={expandLabels}>
                                        <span className="circle-label" style={{ backgroundColor: label.color }}></span>
                                        {labelsExpanded ? label.title : ''}
                                    </div>)}
                                </section>}

                                <section className="card-title flex">
                                    <span>{card.title}</span>

                                </section>

                                <section className="card-preview-details">

                                    {card.members &&
                                        <span className="preview-details-members"> {card.members.map(member => <span key={member._id}> <img className="member-img" src={member.imgUrl} alt="" /></span>)} </span>}

                                    <div className="left">

                                        {card.attachments &&
                                            <span className="attach-container">
                                                <span className="preview-details-attach-icon"><GrAttachment /> </span>
                                                <span>{card.attachments.length}</span>
                                            </span>}

                                        {card.desc &&
                                            <span className="preview-details-desc-icon"><BsTextLeft /> </span>
                                        }

                                        {!!card.checklists.length &&
                                            <div style={isTasksDone(card.checklists[0])} className="preview-details-checklist" >
                                                <span className="preview-details-checklist-icon"> <IoMdCheckboxOutline /> </span>
                                                <span> {doneInCheckList(card.checklists[0])}/{card.checklists[0].todos.length} </span>

                                            </div>}
                                    </div>

                                </section>
                            </div>
                        </div>
                    </Container>
                )}
            </Draggable>

        </>
    )
}

