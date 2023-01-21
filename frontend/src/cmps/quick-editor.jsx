import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { BsCreditCard2Back, BsFillPersonFill } from 'react-icons/bs'
import { TiTag } from 'react-icons/ti'
import { RiBankCard2Line } from 'react-icons/ri'
import { RxClock, RxCross2 } from 'react-icons/rx'
import { FiArchive } from 'react-icons/fi'
import { updateBoard } from "../store/board.actions"
import { boardService } from "../services/board.service.local"
import { useEffect, useRef, useState } from "react"
import { MembersSelect } from "./members-selector"


export function QuickEditor({ groupId, card, toggleQuickEditor, quickEditor }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const [cardToEdit, setCardToEdit] = useState(card)
    const [membersSelect, openMembersSelect] = useState(false)
    const navigate = useNavigate()
    const textAreaRef = useRef(null)

    useEffect(() => {
        textAreaRef.current.select()
    }, [])

    function onOpenCard() {
        navigate(`/board/${board._id}/g/${groupId}/c/${card.id}`)
        toggleQuickEditor(!quickEditor)
    }

    async function onRemoveCard() {

        try {
            const updatedBoard = await boardService.removeCard(board, groupId, card.id)
            updateBoard(updatedBoard)
            toggleQuickEditor(!quickEditor)
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
        toggleQuickEditor(ev, !quickEditor)
    }

    async function onSaveMembers(members) {
        try {
            const updateCard = { ...card, members }
            boardService.saveCard(board, groupId, updateCard)
            updateBoard(board)
        } catch (err) {
            console.log('Cant Add the members ', err)
        }
    }

    function checkAddOrRemove(member) {
        console.log('heyyyy')

        if (!card.members) card.members = []
        const memberIdx = card.members.findIndex(m => m._id === member._id)

        if (memberIdx === -1) card.members.push(member)
        else card.members.splice(memberIdx, 1)

        const newMembers = card.members
        onSaveMembers(newMembers)
    }




    return (
        <>
            <div className="black-bg" onClick={(ev) => toggleQuickEditor(ev, !quickEditor)}></div>
             <div className="quick-editor" onClick={e => e.preventDefault}>


                <div className="quick-editor-textarea" onClick={(e) => e.preventDefault()}>
                    <form onSubmit={onSaveCard}>
                        <textarea
                            ref={textAreaRef}
                            onKeyPress={(e) => { if (e.key === 'Enter') onSaveCard(e) }}
                            type="text"
                            name="title"
                            value={cardToEdit.title}
                            onChange={handleChange}
                            autoFocus

                        >
                        </textarea>
                        <section className="quick-editor-card-details">
                            {card.members && card.members.map(member => <span key={member._id}><img className="member-img" src={member.imgUrl} alt="" /></span>)}
                        </section>
                        <button type="button" className="save-btn">Save</button>
                    </form>
                </div>

                {membersSelect &&

                    <div onClick={(e) => e.preventDefault()}>
                        <MembersSelect
                            checkAddOrRemove={checkAddOrRemove} />
                    </div>}

                <div className="quick-editor-btns" onClick={(e) => e.preventDefault()}>
                    <button onClick={onOpenCard}> <span className="quick-icon"> <BsCreditCard2Back /> </span> Open card</button>
                    <button> <span className="quick-icon"> <TiTag /> </span> Edit labels</button>
                    <button onClick={() => openMembersSelect(!membersSelect)}> <span className="quick-icon"> <BsFillPersonFill /> </span>Change members</button>
                    <button> <span className="quick-icon"> <RiBankCard2Line /> </span> Change cover</button>
                    <button> <span className="quick-icon"> <RxClock /> </span> Edit dates</button>
                    <button onClick={onRemoveCard}> <span className="quick-icon"> <FiArchive /> </span> Delete</button>
                </div>
            </div>
        </>
    )
}
