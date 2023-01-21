import { useState } from "react"
import { boardService } from "../services/board.service.local"
import { DropdownBackgroundColor } from "./dropdown-background-color"

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