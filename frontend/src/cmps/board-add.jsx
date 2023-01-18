import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { boardService } from "../services/board.service.local"
import { DropDown } from "./dropdown"

export function BoardAdd() {

    const [board, setBoard] = useState(boardService.getEmptyBoard())
    const [isAddingBoard, setAddingBoard] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        document.body.addEventListener('click', handleBodyClick)

        return () => {
            document.body.removeEventListener('click', handleBodyClick)
        }
    }, [])

    function handleBodyClick({target}) {
        if (target.classList.contains('board-add') || target.parentElement.classList.contains('board-add')) return
        setAddingBoard(false)
    }

    async function onAddBoard() {
        const title = prompt('Board name?')
        if (!title) return
        board.title = title
        try {
            const savedBoard = await boardService.save(board)
            navigate(`/board/${savedBoard._id}`)
        } catch (err) {
            console.log('Had issues creating a board; ', err)
        }

        // setBoard(prevBoard => {
        //     return {...prevBoard, title}
        // })
    }

    return (
        <article onClick={() => setAddingBoard(prevAddingBoard => !prevAddingBoard)} className="board-add"><span>Create new board</span>
            {isAddingBoard && <DropDown type={'create'} />}
        </article>
    )
}