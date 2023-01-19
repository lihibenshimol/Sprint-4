import { boardService } from "../services/board.service.local";
import { updateBoard } from "../store/board.actions";
import { GroupDetails } from "./group-details";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FiPlus } from 'react-icons/fi'
import { RxCross2 } from 'react-icons/rx'


import { DragDropContext } from 'react-beautiful-dnd'

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
        const { destination, source, draggableId } = res
        if (!destination) return
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) { return }

        const startColumn = board.groups.find(g => g.id === source.droppableId)
        const endColumn = board.groups.find(g => g.id === destination.droppableId)

        if(startColumn.id === endColumn.id) {
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
        const newStartColumn = {...startColumn, cards: startCards}

        const finishCards = [...endColumn.cards]
        finishCards.splice(destination.index, 0, card)
        const newEndColumn = {...endColumn, cards: finishCards}

        board.groups = board.groups.map(g => (g.id === newStartColumn.id) ? newStartColumn : g)
        board.groups = board.groups.map(g => (g.id === newEndColumn.id) ? newEndColumn : g)
        updateBoard(board)
    }

    return (
        <>
            <div className="group-list" >
                <DragDropContext onDragEnd={onDragEnd}>
                    {board.groups.map(group => <section className="group-wrapper flex" key={group.id}>
                        <GroupDetails
                            group={group}
                            onAddCard={onAddCard}
                            onRemoveGroup={onRemoveGroup}
                        />
                    </section>)
                    }
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
