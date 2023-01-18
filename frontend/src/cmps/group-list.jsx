import { boardService } from "../services/board.service.local";
import { updateBoard } from "../store/board.actions";
import { GroupPreview } from "./group-preview";
import { useSelector } from "react-redux";
import addIcon from '../assets/img/add.svg';
import { useState } from "react";




export function GroupList() {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const [editMode, setEditMode] = useState(false)
    const [groupToEdit, setGroupToEdit] = useState(boardService.getEmptyGroup())

    async function addGroup(ev) {
        ev.preventDefault()
        setEditMode(!editMode)
        try {
            await boardService.addNewItem(board, groupToEdit, 'groups')
            updateBoard(board)
        } catch (err) {
            console.log('Cannot add group = ', err)
            throw err
        }
    }

    async function addCard(group, card) {
        try {
            await boardService.addNewItem(group, card, 'cards')
            updateBoard(board)
        } catch (err) {
            throw err
        }
    }

    function handleChange({ target }) {
        let { value } = target
        setGroupToEdit((prevGroup) => ({ ...prevGroup, title: value }))
    }

    return (
        <>
            <div className="group-list" >
                {board.groups.map(group => <section className="group-wrapper flex" key={group.id}>
                    <GroupPreview group={group} addCard={addCard} />
                </section>)}

                <section className="add-group-section">
                    <div onClick={() => setEditMode(!editMode)} className={"add-group-btn" + (editMode ? ' edit-mode' : '')}>
                        <span className="group-list-add-icon"><img src={addIcon} /></span>
                        <span className="placeholder">
                            Add another list
                        </span>
                    </div>

                    <form onSubmit={addGroup} className={"group-title-form" + (editMode ? ' edit-mode' : '')} >
                        <input onChange={handleChange} spellCheck="false" dir="auto" value={groupToEdit.title} />
                        <button className="input-btn">Add list</button>
                    </form>
                </section>
            </div>
        </>
    )
}
