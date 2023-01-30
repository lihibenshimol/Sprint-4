import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { useState } from 'react'
import mainLogo from '../assets/img/main-logo-black.png'

export function HomepageHeader() {

    const [menuOpen, setMenuOpen] = useState(false)

    function handleOpeningMenu() {
        setMenuOpen(prevMenuOpen => !prevMenuOpen)
    }

    return (
        <header className="homepage-header full space-between align-center ">
            <nav className='flex align-center'>
                {/* <Link to="/"><h1>Trellofy</h1></Link> */}
                <Link to="/"><div className='main-img flex'><img src={`${mainLogo}`} alt="" /></div></Link>
                <span className={menuOpen ? 'main-layout full open' : 'main-layout full'}>
                    <Link to="/login">Log in</Link>
                    <Link className='cta-btn' to="/signup">Get Trellofy for free</Link>
                </span>
                <div onClick={handleOpeningMenu} className="hamburger">{menuOpen ? <GrClose /> : <GiHamburgerMenu />}</div>
            </nav>
        </header>
    )
}