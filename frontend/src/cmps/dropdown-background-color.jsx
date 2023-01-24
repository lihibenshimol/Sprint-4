import { boardService } from "../services/board.service"

export function DropdownBackgroundColor({ setBgMenuOpen, setBoardBackground, isSelectedColor, setColorsMenuOpen }) {

    const colors = boardService.getBoardColors()

    function handleClosingDropdown() {
        setBgMenuOpen(false)
    }

    return (
        <section onClick={(ev) => ev.stopPropagation()} className='dropdown dropdown-background'>

            <h3>Colors
                <i onClick={() => setColorsMenuOpen(false)} className='fa arrow-left'></i>
                <i onClick={handleClosingDropdown} className='fa xmark'></i>
            </h3>

            <section className="color-list">
                {colors.map(color => (
                    <div key={color} onClick={() => setBoardBackground(color)} style={{ backgroundColor: color }}>
                        {isSelectedColor(color) && <i className='fa checked'></i>}
                    </div>
                ))}
            </section>
        </section>
    )
}