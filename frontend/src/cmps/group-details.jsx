import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { updateBoard } from "../store/board.actions"
import { CardList } from "./card-list"
import { boardService } from "../services/board.service"
import { RxCross2 } from 'react-icons/rx'
import { FiPlus } from 'react-icons/fi'
import { BsThreeDots } from 'react-icons/bs'
import { Droppable, Draggable } from "react-beautiful-dnd"
import { QuickEditor } from "./quick-editor"
import { socketService, SOCKET_EMIT_BOARD_UPDATED } from "../services/socket.service"


export function GroupDetails({ group, onAddCard, onRemoveGroup, idx }) {
    let board = useSelector(storeState => storeState.boardModule.currBoard)
    board = {...board}
    const [editMode, setEditMode] = useState(false)
    const [addMode, setAddMode] = useState(false)
    const [extrasMenu, openExtraMenu] = useState(false)
    const [groupNewTitle, setGroupNewTitle] = useState(group.title)
    const [cardToEdit, setCardToEdit] = useState(boardService.getEmptyCard())
    const groupTitleRef = useRef(null)
   
    async function changeGroupTitle(ev) {
        ev.preventDefault()
        setEditMode(!editMode)
        group.title = groupNewTitle
        try {
            const savedBoard = await updateBoard(board)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch(err) {
            console.log('Failed to save board ', err)
        }
    }

    function onSaveCard(ev) {
        ev.preventDefault()
        // setAddMode(!addMode)
        if (!cardToEdit.title) setAddMode(!addMode)
        onAddCard(group, cardToEdit)
        setCardToEdit(boardService.getEmptyCard())
    }

    function handleGroupChange({ target }) {
        let { value } = target
        setGroupNewTitle(value)
    }

    function handleCardChange({ target }) {
        let { value } = target
        setCardToEdit((prevCard) => ({ ...prevCard, title: value }))
    }

    return (
        <Draggable draggableId={group.id} index={idx}>
            {(provided) => (
                <section ref={provided.innerRef} {...provided.draggableProps} className="group-wrapper flex">
                    <div className="group-content">
                        <div {...provided.dragHandleProps} className="group-header" >
                            <h1 onClick={() => setEditMode(!editMode)} className={"group-title-text" + (editMode ? ' edit-mode' : '')}>{group.title}</h1>

                            <form onSubmit={changeGroupTitle} onClick={() => groupTitleRef.current.select()}>
                                <input onChange={handleGroupChange} className={"group-title-input" + (editMode ? ' edit-mode' : '')} aria-label={groupNewTitle} autoFocus spellCheck="false" ref={groupTitleRef} dir="auto" value={groupNewTitle} />
                            </form>

                            <span className="extras-menu-btn">
                                <button onClick={() => openExtraMenu(!extrasMenu)}>
                                    <BsThreeDots />
                                </button>

                                {extrasMenu && <div className="group-extras-menu flex">
                                    <span className="title-container">
                                        <p>
                                            List actions
                                        </p>
                                    </span>
                                    <span className="action-btn delete-btn" onClick={() => onRemoveGroup(group.id)}>Delete this list</span>
                                </div>}
                            </span>

                        </div>

                        {group.cards &&
                            <Droppable droppableId={group.id} type="card">
                                {(provided, snapshot) => (
                                    <CardList
                                        innerRef={provided.innerRef}
                                        cards={group.cards} groupId={group.id}
                                        provided={provided}
                                        isDraggingOver={snapshot.isDraggingOver}
                                    >
                                    </CardList>
                                )}
                            </Droppable>
                        }
                

                        <span onClick={() => setAddMode(!addMode)} className={"area-add-item" + (addMode ? ' edit-mode' : '')}> <FiPlus /> Add a card </span>

                        <div className={"add-item-btn" + (addMode ? ' edit-mode' : '')}>
                            <form onSubmit={onSaveCard} >
                                <textarea
                                    autoFocus
                                    onKeyPress={(e) => { if (e.key === 'Enter') onSaveCard(e) }}
                                    type="text"
                                    name="title"
                                    value={cardToEdit.title}
                                    onChange={handleCardChange}
                                    placeholder="Enter a title for this card..."
                                >
                                </textarea>

                                <span className="add-card-btns">
                                    <button className="save-btn">Add card</button>
                                    <button onClick={() => setAddMode(!addMode)} type="button" className="cancel-btn"><RxCross2 /></button>
                                </span>
                            </form>
                        </div>

                    </div>
                </section>
            )}
        </Draggable>
    )
}


