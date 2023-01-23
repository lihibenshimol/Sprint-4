import { Link } from 'react-router-dom'

export function HomepageHeader() {
    return (
        <header className="homepage-header full flex space-between align-center main-layout">
            <nav className='flex align-center'>
                <Link to="/"><h1>Trello</h1></Link>
                <span>
                    <Link to="/login">Log in</Link>
                    <Link className='cta-btn' to="/signup">Get Trello for free</Link>
                </span>
            </nav>
        </header>
    )
}