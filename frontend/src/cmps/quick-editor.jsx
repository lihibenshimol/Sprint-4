import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export function QuickEditor({ groupId, cardId, openQuickEditor, quickEditor }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const navigate = useNavigate()


    function navig(ev) {
        ev.preventDefault()
        navigate(`/board/${board._id}/g/${groupId}/c/${cardId}`)
        openQuickEditor(ev, !quickEditor)
    }

    function del(ev) {
        ev.preventDefault()
        console.log('hello')
    }



    return (
        <>
            <div className="black-bg" onClick={(ev) => openQuickEditor(ev, !quickEditor)}></div>
            <div className="quick-editor-btns">
                <button onClick={(e) => navig(e)}>Open card</button>
                {/* <button onClick={() => navigate(`/board/${board._id}/g/${groupId}/c/${cardId}`)}>Open card</button> */}
                <button>Edit labels</button>
                <button>Change members</button>
                <button>Change cover</button>
                <button>Edit dates</button>
                <button onClick={(ev) => del(ev)}>Delete</button>
            </div>

        </>
    )
}
