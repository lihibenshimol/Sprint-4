import { useState } from "react";
import { useSelector } from "react-redux";
import { updateBoard } from "../store/board.actions";
import { CardList } from "./card-list";
import { boardService } from "../services/board.service.local";
import dotsIcon from '../assets/img/dots.svg'

export function GroupPreview({ group, addCard, removeGroup }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const [editMode, setEditMode] = useState(false)
    const [extrasMenu, openExtraMenu] = useState(false)
    const [groupNewTitle, setGroupNewTitle] = useState(group.title)
    const [cardToEdit, setCardToEdit] = useState(boardService.getEmptyCard())

    function changeGroupTitle(ev) {
        ev.preventDefault()
        setEditMode(!editMode)
        group.title = groupNewTitle
        updateBoard(board)
    }

    function handleGroupChange({ target }) {
        let { value } = target
        setGroupNewTitle(value)
    }

    function onSaveCard(ev) {
        ev.preventDefault()
        addCard(group, cardToEdit)
    }

    function handleCardChange({ target }) {
        let { value } = target
        setCardToEdit((prevCard) => ({ ...prevCard, title: value }))
    }

    return (
        <>
            <div className="group-content">
                <div className="group-header" >
                    <h1 onClick={() => setEditMode(!editMode)} className={"group-title-text" + (editMode ? ' edit-mode' : '')}>{group.title}</h1>

                    <form onSubmit={changeGroupTitle}>
                        <input onChange={handleGroupChange} className={"group-title-input" + (editMode ? ' edit-mode' : '')} aria-label={groupNewTitle} spellCheck="false" dir="auto" value={groupNewTitle} />
                    </form>

                    <span className="extras-menu-btn">
                        <button onClick={() => openExtraMenu(!extrasMenu)}><img src={dotsIcon} alt="" />
                        </button>

                        {extrasMenu && <div className="extras-menu flex">
                            <span className="title-container">
                                <p>
                                    List actions
                                </p>
                            </span>
                            <span className="action-btn delete-btn" onClick={() => removeGroup(group.id)}>Delete this list</span>
                        </div>}
                    </span>

                </div>

                {group.cards && <CardList cards={group.cards} />}

                <form onSubmit={onSaveCard}>
                    <input type="text"
                        name="title"
                        placeholder="Enter a title for this card..."
                        value={cardToEdit.title}
                        onChange={handleCardChange}
                    />
                </form>
            </div>
        </>
    )
}


