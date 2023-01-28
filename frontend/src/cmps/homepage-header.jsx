import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { useState } from 'react'

export function HomepageHeader() {

    const [menuOpen, setMenuOpen] = useState(false)

    function handleOpeningMenu() {
        setMenuOpen(prevMenuOpen => !prevMenuOpen)
    }

    return (
        <header className="homepage-header full flex space-between align-center main-layout">
            <nav className='flex align-center'>
                <Link to="/"><h1>Taskello</h1></Link>
                <span className={menuOpen ? 'main-layout full open' : 'main-layout full'}>
                    <Link to="/login">Log in</Link>
                    <Link className='cta-btn' to="/signup">Get Taskello for free</Link>
                </span>
                <div onClick={handleOpeningMenu} className="hamburger">{menuOpen ? <GrClose /> : <GiHamburgerMenu />}</div>
            </nav>
        </header>
    )
}