export function DropdownBackground({ setBgMenuOpen, setBoardBackground }) {

    function handleClosingDropdown() {
        setBgMenuOpen(false)
    }

    return (
        <section onClick={(ev) => ev.stopPropagation()} className='dropdown dropdown-background'>

            <h3>Board background
                <i onClick={handleClosingDropdown} className='fa xmark'></i>
            </h3>

            <section className="dropdown-background-photos">
                <label>Photos</label>
                {/* <button>See more</button> */}
            </section>

            <section className="dropdown-background-colors">
                <label>Colors</label>
                {/* <button>See more</button> */}
            </section>
        </section>
    )
}