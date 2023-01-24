import { useState } from 'react'
import { boardService } from "../services/board.service"
import { useNavigate } from 'react-router-dom'
import { addBoard } from '../store/board.actions'
import { DropDown } from './dropdown'

import groupsImg from '../assets/img/groups-img.svg'
import bgImg1 from '../assets/img/bg-img-1.jpg'
import bgImg2 from '../assets/img/bg-img-2.jpg'
import bgImg3 from '../assets/img/bg-img-3.jpg'
import bgImg4 from '../assets/img/bg-img-4.jpg'
import { useEffect } from 'react'
import { useRef } from 'react'
import { socketService, SOCKET_EMIT_CREATE_BOARD } from '../services/socket.service'

export function DropdownCreate({ setAddingBoard, fromNavbar, setDropDown }) {

    const [board, setBoard] = useState(boardService.getEmptyBoard())
    const [isBgMenuOpen, setBgMenuOpen] = useState(false)
    const navigate = useNavigate()
    const colors = boardService.getBoardColors()
    const dropdownRef = useRef(null)

    useEffect(() => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect()
            const availableSpaceRight = window.innerWidth - rect.left
            const availableSpaceLeft = rect.left

            if ((fromNavbar && availableSpaceRight - dropdownRef.current.offsetWidth > 0) || availableSpaceRight > availableSpaceLeft) {
                if (!fromNavbar) dropdownRef.current.style = 'left: 105%'


            } else {
                if (fromNavbar) dropdownRef.current.style = 'left: -383%'
                else dropdownRef.current.style = 'left: -160%'
            }
            window.scrollTo(0, document.body.scrollHeight)
        }
    }, [dropdownRef])

    async function onAddBoard(ev) {
        ev.preventDefault()
        if (!board.title) return
        try {
            const savedBoard = await addBoard(board)
            socketService.emit(SOCKET_EMIT_CREATE_BOARD, savedBoard)
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
        if (bg.charAt(0) === '#') {
            setBoard(prevBoard => ({ ...prevBoard, style: { ...prevBoard.style, backgroundColor: bg, backgroundImage: null } }))
        } else {
            setBoard(prevBoard => ({ ...prevBoard, style: { ...prevBoard.style, backgroundColor: null, backgroundImage: `url(${bg})` } }))
        }
    }

    function isSelectedColor(clr) {
        if (clr.charAt(0) === '#') {
            return clr === board.style.backgroundColor
        } else {
            const url = `url(${clr})`
            return url === board.style.backgroundImage
        }
    }

    const previewBgStyle = board.style.backgroundImage ? { backgroundImage: board.style.backgroundImage } : { backgroundColor: board.style.backgroundColor }

    return (
        <section ref={dropdownRef} onClick={(ev) => { ev.stopPropagation(); setBgMenuOpen(false) }} className={fromNavbar ? 'dropdown dropdown-create-navbar' : 'dropdown dropdown-create'}>

            <h3>Create board
                <i onClick={handleClosingDropdown} className='fa xmark'></i>
                {fromNavbar && <i onClick={() => setAddingBoard(prevAddingBoard => !prevAddingBoard)} className='fa arrow-left'></i>}
            </h3>

            <section className="img-container">
                <div className="img-background" style={previewBgStyle}>
                    <img src={groupsImg} alt="Groups image" />
                </div>
            </section>

            <form onSubmit={onAddBoard}>
                <label>Background</label>

                <section className='bg-options'>
                    <div onClick={() => setBoardBackground(bgImg1)} style={{ backgroundImage: `url(${bgImg1})` }}>
                        {isSelectedColor(bgImg1) && <i className='fa checked'></i>}
                    </div>
                    <div onClick={() => setBoardBackground(bgImg2)} style={{ backgroundImage: `url(${bgImg2})` }}>
                        {isSelectedColor(bgImg2) && <i className='fa checked'></i>}
                    </div>
                    <div onClick={() => setBoardBackground(bgImg3)} style={{ backgroundImage: `url(${bgImg3})` }}>
                        {isSelectedColor(bgImg3) && <i className='fa checked'></i>}
                    </div>
                    <div onClick={() => setBoardBackground(bgImg4)} style={{ backgroundImage: `url(${bgImg4})` }}>
                        {isSelectedColor(bgImg4) && <i className='fa checked'></i>}
                    </div>
                </section>

                <section className='clr-options'>

                    {colors.slice(0, 5).map(color => (
                        <div key={color} onClick={() => setBoardBackground(color)} style={{ backgroundColor: color }}>
                            {isSelectedColor(color) && <i className='fa checked'></i>}
                        </div>
                    ))}

                    <div onClick={(ev) => { ev.stopPropagation(); setBgMenuOpen(prevMenuOpen => !prevMenuOpen) }} className='more-clr-options'>
                        {isBgMenuOpen && <DropDown isSelectedColor={isSelectedColor} colors={colors} setBoardBackground={setBoardBackground} setBgMenuOpen={setBgMenuOpen} type={'background'} />}
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