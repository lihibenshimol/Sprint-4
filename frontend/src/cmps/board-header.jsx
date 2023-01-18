import { useSelector } from "react-redux"


export function BoardHeader() {
    const board = useSelector(storeState => storeState.boardModule.currBoard)

    if (!board) return <h1>Loading...</h1>
    return (
        <>
            <div className="board-header">
                <section className="left">
                    <h1 className="board-header-text">Sprint 4</h1>
                    <input className="board-name-input" aria-label="Sprint 4" spellCheck="false" dir="auto" value="Sprint 4" />
                    <span className="star-icon-box">
                        <button className="board-header-btn-icon fa star-icon"></button>
                    </span>
                   {board && <div className="board-members">
                        {board.members.map(member =>
                            <div key={member._id} className="member-img"> <img src={member.imgUrl} alt={member.fullname} /></div>
                        )}
                    </div>}

                </section>
            </div>

        </>
    )
}