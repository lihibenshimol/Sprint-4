import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { boardService } from "../services/board.service.local"

export function BoardAdd(){

    const [board, setBoard] = useState(boardService.getEmptyBoard())
    const navigate = useNavigate()


    async function onAddBoard(){
        const title = prompt('Board name?')
        if(!title) return
        board.title = title
        try {
            const savedBoard = await boardService.save(board)
            navigate(`/board/${savedBoard._id}`)
        } catch(err) {
            console.log('Had issues creating a board; ', err)
        }


        // setBoard(prevBoard => {
        //     return {...prevBoard, title}
        // })
    }

    return (
        <article onClick={onAddBoard} className="board-add"><span>Create new board</span></article>
    )
}