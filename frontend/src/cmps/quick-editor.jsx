import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export function QuickEditor({ groupId, cardId, openQuickEditor, quickEditor }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const navigate = useNavigate()



    return (
        <>
            <div className="black-bg" onClick={(ev) => openQuickEditor(ev, !quickEditor)}></div>
            <div className="quick-editor-btns">
                <button onClick={() => navigate(`/board/${board._id}/g/${groupId}/c/${cardId}`)}>Open card</button>
                <button>Edit labels</button>
                <button>Change members</button>
                <button>Change cover</button>
                <button>Edit dates</button>
                <button>Delete</button>
            </div>

        </>
    )
}