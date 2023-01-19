import { useNavigate } from "react-router-dom"

export function BoardPreview({ board }) {

    const navigate = useNavigate()

    return (
        <article onClick={() => navigate(`/board/${board._id}`)} style={board.style ? board.style : { backgroundColor: '#026aa7' }} className="board-preview">
            <h3>{board.title}</h3>
        </article>
    )
}