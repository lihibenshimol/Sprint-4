import { useState } from 'react'
import { boardService } from "../services/board.service.local"
import groupsImg from '../assets/img/groups-img.svg'
import { useNavigate } from 'react-router-dom'

export function DropdownCreate() {

    const [board, setBoard] = useState(boardService.getEmptyBoard())
    const navigate = useNavigate()

    async function onAddBoard(ev) {
        ev.preventDefault()
        if (!board.title) return
        try {
            const savedBoard = await boardService.save(board)
            navigate(`/board/${savedBoard._id}`)
        } catch (err) {
            console.log('Had issues creating a board; ', err)
        }
    }

    function handleChange({ target }) {
        const { value, name: field } = target
        setBoard(prevBoard => ({ ...prevBoard, [field]: value }))
    }

    return (
        <section onClick={(ev) => ev.stopPropagation()} className="dropdown dropdown-create">
            <h3>Create board</h3>

            <section className="img-container">
                <div className="img-background">
                    <img src={groupsImg} alt="Groups image" />
                </div>
            </section>

            <form onSubmit={onAddBoard}>
                <input name='title' value={board.title} onChange={handleChange} type="text" />
                <button>Create</button>
            </form>
        </section>
    )
}