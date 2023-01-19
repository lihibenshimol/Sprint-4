import { boardService } from "../services/board.service.local";
import { updateBoard } from "../store/board.actions";
import { GroupDetails } from "./group-details";
import { useSelector } from "react-redux";
import { useState } from "react";
import addIcon from '../assets/img/add.svg';

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
            groupToEdit.title = ''
        } catch (err) {
            console.log('Cannot add group = ', err)
            throw err
        }
    }

    async function addCard(group, card) {
        try {
            await boardService.addNewItem(group, card, 'cards')
            updateBoard(board)
            card.title = ''
        } catch (err) {
            console.log('Cannot remove group = ', err)
        }
    }

    async function removeGroup(groupId) {
        try {
            const idx = board.groups.findIndex(g => g.id === groupId)
            board.groups.splice(idx, 1)
            updateBoard(board)

        } catch (err) {
            console.log('Cannot remove group = ', err)
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
                    <GroupDetails
                        group={group}
                        addCard={addCard}
                        removeGroup={removeGroup}
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
