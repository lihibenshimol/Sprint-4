import { useEffect, useRef, useState } from "react"
import { boardService } from "../services/board.service.local"
import { DropdownBackgroundColor } from "./dropdown-background-color"
import bgImg1 from '../assets/img/bg-img-1.jpg'
import bgImg2 from '../assets/img/bg-img-2.jpg'
import bgImg3 from '../assets/img/bg-img-3.jpg'
import bgImg4 from '../assets/img/bg-img-4.jpg'
import bgImg5 from '../assets/img/bg-img-5.jpg'
import bgImg6 from '../assets/img/bg-img-6.jpg'

export function DropdownBackground({ setBgMenuOpen, setBoardBackground, isSelectedColor }) {

    const [isColorsMenuOpen, setColorsMenuOpen] = useState(false)
    const colors = boardService.getBoardColors()

    const dropdownRef = useRef(null)

    useEffect(() => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect()
            const availableSpaceRight = window.innerWidth - rect.left
            const availableSpaceLeft = rect.left
            
            if (availableSpaceRight - dropdownRef.current.offsetWidth > 0 || availableSpaceRight > availableSpaceLeft) {
                dropdownRef.current.style = 'left: 110%'

            } else {
                dropdownRef.current.style = 'left: -770%'

            }
            window.scrollTo(0, document.body.scrollHeight)
        }
    }, [dropdownRef])

    function handleClosingDropdown() {
        setBgMenuOpen(false)
    }

    function onOpenColorsMenu(ev) {
        ev.stopPropagation()
        setColorsMenuOpen(true)
    }

    if (isColorsMenuOpen) return <DropdownBackgroundColor setColorsMenuOpen={setColorsMenuOpen} setBgMenuOpen={setBgMenuOpen} setBoardBackground={setBoardBackground} isSelectedColor={isSelectedColor} />
    return (
        <section ref={dropdownRef} onClick={(ev) => ev.stopPropagation()} className='dropdown dropdown-background'>

            <h3>Board background
                <i onClick={handleClosingDropdown} className='fa xmark'></i>
            </h3>

            <section className="dropdown-background-photos">
                <div>
                    <label>Photos</label>
                    <button>See more</button>
                </div>
                <section className="picture-list">
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
                    <div onClick={() => setBoardBackground(bgImg5)} style={{ backgroundImage: `url(${bgImg5})` }}>
                        {isSelectedColor(bgImg5) && <i className='fa checked'></i>}
                    </div>
                    <div onClick={() => setBoardBackground(bgImg6)} style={{ backgroundImage: `url(${bgImg6})` }}>
                        {isSelectedColor(bgImg6) && <i className='fa checked'></i>}
                    </div>
                </section>
            </section>

            <section className="dropdown-background-colors">
                <div>
                    <label>Colors</label>
                    <button onClick={onOpenColorsMenu}>See more</button>
                </div>
                <section className="color-list">
                    {colors.slice(0, 6).map(color => (
                        <div key={color} onClick={() => setBoardBackground(color)} style={{ backgroundColor: color }}>
                            {isSelectedColor(color) && <i className='fa checked'></i>}
                        </div>
                    ))}
                </section>
            </section>
        </section>
    )
}