import { useState } from 'react'
import { boardService } from "../services/board.service.local"
import { useNavigate } from 'react-router-dom'
import { addBoard } from '../store/board.actions'
import groupsImg from '../assets/img/groups-img.svg'
import { DropDown } from './dropdown'

export function DropdownCreate({ setAddingBoard, fromNavbar, setDropDown }) {

    const [board, setBoard] = useState(boardService.getEmptyBoard())
    const [isBgMenuOpen, setBgMenuOpen] = useState(false)
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

    function setBoardBackground(bg) {
        setBoard(prevBoard => ({ ...prevBoard, style: { ...prevBoard.style, backgroundColor: bg } }))
    }

    function isSelectedColor(clr) {
        return clr === board.style.backgroundColor
    }

    return (
        <section onClick={(ev) => { ev.stopPropagation(); setBgMenuOpen(false) }} className={fromNavbar ? 'dropdown dropdown-create-navbar' : 'dropdown dropdown-create'}>

            <h3>Create board
                <i onClick={handleClosingDropdown} className='fa xmark'></i>
                {fromNavbar && <i onClick={() => setAddingBoard(prevAddingBoard => !prevAddingBoard)} className='fa arrow-left'></i>}
            </h3>

            <section className="img-container">
                <div className="img-background" style={{ backgroundColor: board.style.backgroundColor }}>
                    <img src={groupsImg} alt="Groups image" />
                </div>
            </section>

            <form onSubmit={onAddBoard}>
                <label>Background</label>
                <section className='bg-options'></section>
                <section className='clr-options'>
                    <div onClick={() => setBoardBackground('#0079bf')} style={{ backgroundColor: '#0079bf' }}>
                        {isSelectedColor('#0079bf') && <i className='fa checked'></i>}
                    </div>
                    <div onClick={() => setBoardBackground('#d29034')} style={{ backgroundColor: '#d29034' }}>
                        {isSelectedColor('#d29034') && <i className='fa checked'></i>}
                    </div>
                    <div onClick={() => setBoardBackground('#519839')} style={{ backgroundColor: '#519839' }}>
                        {isSelectedColor('#519839') && <i className='fa checked'></i>}
                    </div>
                    <div onClick={() => setBoardBackground('#b04632')} style={{ backgroundColor: '#b04632' }}>
                        {isSelectedColor('#b04632') && <i className='fa checked'></i>}
                    </div>
                    <div onClick={() => setBoardBackground('#89609e')} style={{ backgroundColor: '#89609e' }}>
                        {isSelectedColor('#89609e') && <i className='fa checked'></i>}
                    </div>
                    <div onClick={(ev) => { ev.stopPropagation(); setBgMenuOpen(prevMenuOpen => !prevMenuOpen) }} className='more-clr-options'>
                        {isBgMenuOpen && <DropDown setBoardBackground={setBoardBackground} setBgMenuOpen={setBgMenuOpen} type={'background'} />}
                    </div>
                </section>

                <label htmlFor="title">Board title <span className='required'>*</span></label>
                <input className={board.title ? '' : 'input-required'} autoFocus name='title' value={board.title} onChange={handleChange} type="text" />
                <p><span>👋</span>Board title is required</p>
                <button className={board.title ? '' : 'btn-disabled'}>Create</button>
            </form>
        </section>
    )
}