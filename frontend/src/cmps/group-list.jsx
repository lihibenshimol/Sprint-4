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
    }

    function handleChange({ target }) {
        let { value } = target
        setGroupToEdit((prevGroup) => ({ ...prevGroup, title: value }))
    }

    function onDragEnd(res){
        // TODO: reorder our columns
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
                    {/* <div onClick={() => setEditMode(!editMode)} className={"add-group-btn" + (editMode ? ' edit-mode' : '')}>
                        <span className="placeholder">
                            <FiPlus />  Add another list
                        </span>
                    </div> */}

                    <span onClick={() => setEditMode(!editMode)} className={"add-item-btn" + (editMode ? ' edit-mode' : '')}> <FiPlus /> Add another list </span>

                    <div className={"add-item" + (editMode ? ' edit-mode' : '')}>
                        <form onSubmit={addGroup} >
                            <textarea
                                type="text"
                                name="title"
                                value={groupToEdit.title}
                                onChange={handleChange}
                                placeholder="Enter list title..."
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
