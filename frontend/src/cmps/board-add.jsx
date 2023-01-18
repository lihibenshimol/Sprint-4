import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DropDown } from "./dropdown"

export function BoardAdd() {
    
    const [isAddingBoard, setAddingBoard] = useState(false)

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

    return (
        <article onClick={() => setAddingBoard(prevAddingBoard => !prevAddingBoard)} className="board-add"><span>Create new board</span>
            {isAddingBoard && <DropDown setAddingBoard={setAddingBoard} type={'create'} />}
        </article>
    )
}