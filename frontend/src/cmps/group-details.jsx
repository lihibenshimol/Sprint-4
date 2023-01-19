import { useState } from "react";
import { useSelector } from "react-redux";
import { updateBoard } from "../store/board.actions";
import { CardList } from "./card-list";
import { boardService } from "../services/board.service.local";
import dotsIcon from '../assets/img/dots.svg'
import addIcon from '../assets/img/add.svg';
import { RxCross2 } from 'react-icons/rx'
import { FiPlus } from 'react-icons/fi'
import { Droppable } from "react-beautiful-dnd";


export function GroupDetails({ group, onAddCard, onRemoveGroup }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const [editMode, setEditMode] = useState(false)
    const [addMode, setAddMode] = useState(false)
    const [extrasMenu, openExtraMenu] = useState(false)
    const [groupNewTitle, setGroupNewTitle] = useState(group.title)
    const [cardToEdit, setCardToEdit] = useState(boardService.getEmptyCard())

    function changeGroupTitle(ev) {
        ev.preventDefault()
        setEditMode(!editMode)
        group.title = groupNewTitle
        updateBoard(board)
    }

    // function handleChange({ target }) {
    //     let { value } = target

    //     if (target.id === 'group')  setGroupNewTitle(value)
    //     else if (target.id === 'card') setCardToEdit((prevCard) => ({ ...prevCard, title: value }))
    // }


    function onSaveCard(ev) {
        ev.preventDefault()
        setAddMode(!addMode)
        onAddCard(group, cardToEdit)
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
                            <span className="action-btn delete-btn" onClick={() => onRemoveGroup(group.id)}>Delete this list</span>
                        </div>}
                    </span>

                </div>

                {group.cards &&
                    <Droppable droppableId={group.id}>
                        {(provided) => (
                            <CardList
                                innerRef={provided.innerRef}
                                cards={group.cards} groupId={group.id}
                                provided={provided}
                            >

                            </CardList>
                        )}
                    </Droppable>
                    // <Droppable droppableId={group.id}>
                    //     {(provided) => (
                    //         <CardList
                    //             innerRef={provided.innerRef}
                    //             {...provided.droppableProps} cards={group.cards} groupId={group.id}
                    //         >
                    //             {group.cards.map((card, index) => (
                    //                 <Card key={card.id} card={card} index={index} groupId={group.id} />
                    //             ))}
                    //             {provided.placeholder}
                    //         </CardList>
                    //     )}
                    // </Droppable>
                }

                <span onClick={() => setAddMode(!addMode)} className={"area-add-item" + (addMode ? ' edit-mode' : '')}> <FiPlus /> Add a card </span>

                <div className={"add-item-btn" + (addMode ? ' edit-mode' : '')}>
                    <form onSubmit={onSaveCard} >
                        <textarea
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
        </>
    )
}

