import { useState } from "react"
import { boardService } from "../services/board.service.local"
import { DropdownBackgroundColor } from "./dropdown-background-color"
import bgImg1 from '../assets/img/bg-img-1.jpg'
import bgImg2 from '../assets/img/bg-img-2.jpg'
import bgImg3 from '../assets/img/bg-img-3.jpg'
import bgImg4 from '../assets/img/bg-img-4.jpg'

export function DropdownBackground({ setBgMenuOpen, setBoardBackground, isSelectedColor }) {

    const [isColorsMenuOpen, setColorsMenuOpen] = useState(false)
    const colors = boardService.getBoardColors()

    function handleClosingDropdown() {
        setBgMenuOpen(false)
    }

    function onOpenColorsMenu(ev) {
        ev.stopPropagation()
        setColorsMenuOpen(true)
    }

    if (isColorsMenuOpen) return <DropdownBackgroundColor setColorsMenuOpen={setColorsMenuOpen} setBgMenuOpen={setBgMenuOpen} setBoardBackground={setBoardBackground} isSelectedColor={isSelectedColor} />
    return (
        <section onClick={(ev) => ev.stopPropagation()} className='dropdown dropdown-background'>

            <h3>Board background
                <i onClick={handleClosingDropdown} className='fa xmark'></i>
            </h3>

            <section className="dropdown-background-photos">
                <div>
                    <label>Photos</label>
                    <button>See more</button>
                </div>
                <section className="picture-list">
                    <div style={{backgroundImage: `url(${bgImg1})`}}></div>
                    <div style={{backgroundImage: `url(${bgImg2})`}}></div>
                    <div style={{backgroundImage: `url(${bgImg3})`}}></div>
                    <div style={{backgroundImage: `url(${bgImg4})`}}></div>
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