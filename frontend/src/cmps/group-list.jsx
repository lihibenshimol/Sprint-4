import { boardService } from "../services/board.service.local";
import { updateBoard } from "../store/board.actions";
import { GroupDetails } from "./group-details";
import { useSelector } from "react-redux";
import { useState } from "react";
import addIcon from '../assets/img/add.svg';

export function GroupList({onAddGroup, onAddCard, onRemoveGroup}) {
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

    return (
        <>
            <div className="group-list" >
                {board.groups.map(group => <section className="group-wrapper flex" key={group.id}>
                    <GroupDetails
                        group={group}
                        onAddCard={onAddCard}
                        onRemoveGroup={onRemoveGroup}
                    />
                </section>)}

                <section className="add-group-section">
                    <div onClick={() => setEditMode(!editMode)} className={"add-group-btn" + (editMode ? ' edit-mode' : '')}>
                        <span className="group-list-add-icon">
                            <img src={addIcon} /> </span>
                        <span className="placeholder">
                            Add another list
                        </span>
                    </div>

                    <form onSubmit={addGroup} className={"group-title-form" + (editMode ? ' edit-mode' : '')} >
                        <input onChange={handleChange}
                            spellCheck="false"
                            dir="auto"
                            value={groupToEdit.title} />
                        <button className="btn-add-group">Add list</button>
                    </form>
                </section>
            </div>
        </>
    )
}
