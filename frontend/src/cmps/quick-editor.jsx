import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { BsCreditCard2Back, BsFillPersonFill } from 'react-icons/bs'
import { TiTag } from 'react-icons/ti'
import { RiBankCard2Line } from 'react-icons/ri'
import { RxClock } from 'react-icons/rx'
import { FiArchive } from 'react-icons/fi'
import { updateBoard } from "../store/board.actions"


export function QuickEditor({ groupId, cardId, openQuickEditor, quickEditor }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const navigate = useNavigate()


    function navig(ev) {
        ev.preventDefault()
        navigate(`/board/${board._id}/g/${groupId}/c/${cardId}`)
        openQuickEditor(ev, !quickEditor)
    }

    function removeCard(ev) {
        ev.preventDefault()
        const group = board.groups.find(g => g.id === groupId)
        const cardIndex = group.cards.findIndex(c => c.id === cardId)
        group.cards.splice(cardIndex, 1)
        updateBoard(board)
    }



    return (
        <>
            <div className="black-bg" onClick={(ev) => openQuickEditor(ev, !quickEditor)}></div>
            <div className="quick-editor-btns">
                <button onClick={(e) => navig(e)}> <span className="quick-icon"> <BsCreditCard2Back /> </span> Open card</button>
                {/* <button onClick={() => navigate(`/board/${board._id}/g/${groupId}/c/${cardId}`)}>Open card</button> */}
                <button> <span className="quick-icon"> <TiTag /> </span> Edit labels</button>
                <button> <span className="quick-icon"> <BsFillPersonFill /> </span>Change members</button>
                <button> <span className="quick-icon"> <RiBankCard2Line /> </span> Change cover</button>
                <button> <span className="quick-icon"> <RxClock /> </span> Edit dates</button>
                <button onClick={(ev) => removeCard(ev)}> <span className="quick-icon"> <FiArchive /> </span> Delete</button>
            </div>

        </>
    )
}
