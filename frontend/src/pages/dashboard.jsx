import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export function Dashboard() {

    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const navigate = useNavigate()



    return (
        <>
            <div className="black-bg full" onClick={() => navigate(`/board/${board._id}`)}></div>
            <div className="dashboard">
                <h1>{board?.title}</h1>
            <div className="board-counts" style={{backgroundColor: 'transparent'}}>

                <section>
                    {board?.members.length} Members
                </section>

            </div>


            </div>
        </>
    )
}