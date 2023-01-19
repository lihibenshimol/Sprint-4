import { useState } from 'react'
import { boardService } from "../services/board.service.local"
import groupsImg from '../assets/img/groups-img.svg'
import { useNavigate } from 'react-router-dom'
import { addBoard } from '../store/board.actions'

export function DropdownCreate({ setAddingBoard, fromNavbar, setDropDown }) {

    const [board, setBoard] = useState(boardService.getEmptyBoard())
    const navigate = useNavigate()

    async function onAddBoard(ev) {
        ev.preventDefault()
        if (!board.title) return
        try {
            const savedBoard = await addBoard(board)
            setAddingBoard(false)
            if (setDropDown) setDropDown({})
            navigate(`/board/${savedBoard._id}`)
        } catch (err) {
            console.log('Had issues creating a board; ', err)
        }
    }

    function handleChange({ target }) {
        const { value, name: field } = target
        setBoard(prevBoard => ({ ...prevBoard, [field]: value }))
    }

    function handleClosingDropdown() {
        if (setDropDown) setDropDown({})
        setAddingBoard(prevAddingBoard => !prevAddingBoard)
    }

    return (
        <section onClick={(ev) => ev.stopPropagation()} className={fromNavbar ? 'dropdown dropdown-create-navbar' : 'dropdown dropdown-create'}>

            <h3>Create board
                <i onClick={handleClosingDropdown} className='fa xmark'></i>
                {fromNavbar && <i onClick={() => setAddingBoard(prevAddingBoard => !prevAddingBoard)} className='fa arrow-left'></i>}
            </h3>

            <section className="img-container">
                <div className="img-background">
                    <img src={groupsImg} alt="Groups image" />
                </div>
            </section>

            <form onSubmit={onAddBoard}>
                <label htmlFor="title">Board title <span className='required'>*</span></label>
                <input className={board.title ? '' : 'input-required'} autoFocus name='title' value={board.title} onChange={handleChange} type="text" />
                <button className={board.title ? '' : 'btn-disabled'}>Create</button>
            </form>
        </section>
    )
}