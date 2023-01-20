import { boardService } from "../services/board.service.local";
import { updateBoard } from "../store/board.actions";
import { GroupDetails } from "./group-details";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FiPlus } from 'react-icons/fi'
import { RxCross2 } from 'react-icons/rx'


import { DragDropContext, Droppable } from 'react-beautiful-dnd'

export function GroupList({ onAddGroup, onAddCard, onRemoveGroup }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const [editMode, setEditMode] = useState(false)
    const [groupToEdit, setGroupToEdit] = useState(boardService.getEmptyGroup())


    function addGroup(ev) {
        ev.preventDefault()
        setEditMode(!editMode)
        onAddGroup(groupToEdit)
        setGroupToEdit(boardService.getEmptyGroup())
    }

    function handleChange({ target }) {
        let { value } = target
        setGroupToEdit((prevGroup) => ({ ...prevGroup, title: value }))
    }

    function onDragEnd(res) {
        // TODO: reorder our columns
        const { destination, source, draggableId, type } = res
        if (!destination) return
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) { return }

        if (type === 'column') {
            const newColumns = [...board.groups]
            const column = newColumns.find(c => c.id === draggableId)
            newColumns.splice(source.index, 1)
            newColumns.splice(destination.index, 0, column)

            board.groups = newColumns
            updateBoard(board)
        }


        const startColumn = board.groups.find(g => g.id === source.droppableId)
        const endColumn = board.groups.find(g => g.id === destination.droppableId)

        // if(!startColumn || endColumn) return
        if (startColumn?.id === endColumn?.id) {
            if (!startColumn?.id || !endColumn?.id) return
            const newCards = [...startColumn.cards]
            const card = newCards.find(c => c.id === draggableId)
            newCards.splice(source.index, 1)
            newCards.splice(destination.index, 0, card)

            const newColumn = { ...startColumn, cards: newCards }
            board.groups = board.groups.map(g => (g.id === newColumn.id) ? newColumn : g)
            console.log(board.groups)
            updateBoard(board)
            return
        }

        const startCards = [...startColumn.cards]
        const card = startCards.find(c => c.id === draggableId)
        startCards.splice(source.index, 1)
        const newStartColumn = { ...startColumn, cards: startCards }

        const finishCards = [...endColumn.cards]
        finishCards.splice(destination.index, 0, card)
        const newEndColumn = { ...endColumn, cards: finishCards }

        board.groups = board.groups.map(g => {
            if (g.id === newStartColumn.id) return newStartColumn
            else if (g.id === newEndColumn.id) return newEndColumn
            else return g
        })

        updateBoard(board)
    }

    return (
        <>
            <div className="group-list" >
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="all-columns" direction="horizontal" type="column">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="group-list">
                                {board.groups.map((group, idx) =>
                                    <GroupDetails
                                        idx={idx}
                                        key={group.id}
                                        group={group}
                                        onAddCard={onAddCard}
                                        onRemoveGroup={onRemoveGroup}
                                    />
                                )
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>


                <section className="add-group-section">

                    <span onClick={() => setEditMode(!editMode)} className={"add-item-btn" + (editMode ? ' edit-mode' : '')}> <FiPlus /> Add another list </span>

                    <div className={"add-item" + (editMode ? ' edit-mode' : '')}>
                        <form onSubmit={addGroup} >
                            <textarea
                                onKeyPress={(e) => { if (e.key === 'Enter') addGroup(e) }}
                                type="text"
                                name="title"
                                value={groupToEdit.title}
                                onChange={handleChange}
                                placeholder="Enter list title..."
                                autoFocus
                            >
                            </textarea>

                            <span className="add-group-btns">
                                <button className="save-btn">Add list</button>
                                <button onClick={() => setEditMode(!editMode)} type="button" className="cancel-btn"><RxCross2 /></button>
                            </span>
                        </form>
                    </div>
                </section>
            </div>
        </>
    )
}
