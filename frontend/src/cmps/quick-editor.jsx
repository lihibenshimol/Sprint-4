import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { BsCreditCard2Back, BsFillPersonFill } from 'react-icons/bs'
import { TiTag } from 'react-icons/ti'
import { RiBankCard2Line } from 'react-icons/ri'
import { RxClock } from 'react-icons/rx'
import { FiArchive } from 'react-icons/fi'
import { updateBoard } from "../store/board.actions"
import { boardService } from "../services/board.service.local"
import { useState } from "react"


export function QuickEditor({ groupId, card, openQuickEditor, quickEditor }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const [cardToEdit, setCardToEdit] = useState(card)
    const navigate = useNavigate()


    function onOpenCard(ev) {
        ev.preventDefault()
        navigate(`/board/${board._id}/g/${groupId}/c/${card.id}`)
        openQuickEditor(ev, !quickEditor)
    }

    async function onRemoveCard(ev) {
        ev.preventDefault()
        try {
            const updatedBoard = await boardService.removeCard(board, groupId, card.id)
            updateBoard(updatedBoard)
            openQuickEditor(ev, !quickEditor)
        } catch (err) {
            console.log('err = ', err)
        }
    }

    function handleChange({ target }) {
        let { value } = target
        setCardToEdit((prevCard) => ({ ...prevCard, title: value }))
    }

    function onSaveCard(ev) {
        ev.preventDefault()
        card.title = cardToEdit.title
        updateBoard(board)
        openQuickEditor(ev, !quickEditor)
    }



    return (
        <>
            <div className="black-bg" onClick={(ev) => openQuickEditor(ev, !quickEditor)}></div>

            <div className="quick-editor-textarea">
                <form onSubmit={onSaveCard}>
                    <textarea
                    onClick={(e) => e.preventDefault()}
                        onKeyPress={(e) => { if (e.key === 'Enter') onSaveCard(e) }}
                        type="text"
                        name="title"
                        value={cardToEdit.title}
                        onChange={handleChange}
                        autoFocus
                        
                    >
                    </textarea>
                    <section className="quick-editor-card-details">
                        {card.members && card.members.map(member => <span key={member.id}><img className="member-img" src={member.imgUrl} alt="" /></span>)}
                    </section>
                    <button type="button" className="save-btn">Save</button>
                </form>

            </div>
            <div className="quick-editor-btns">
                <button onClick={(e) => onOpenCard(e)}> <span className="quick-icon"> <BsCreditCard2Back /> </span> Open card</button>
                <button> <span className="quick-icon"> <TiTag /> </span> Edit labels</button>
                <button> <span className="quick-icon"> <BsFillPersonFill /> </span>Change members</button>
                <button> <span className="quick-icon"> <RiBankCard2Line /> </span> Change cover</button>
                <button> <span className="quick-icon"> <RxClock /> </span> Edit dates</button>
                <button onClick={(ev) => onRemoveCard(ev)}> <span className="quick-icon"> <FiArchive /> </span> Delete</button>
            </div>

        </>
    )
}
