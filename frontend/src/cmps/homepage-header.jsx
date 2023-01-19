import { Link } from 'react-router-dom'

export function HomepageHeader() {
    return (
        <header className="homepage-header full flex space-between align-center main-container">
            <nav className='flex align-center'>
                <Link to="/"><h1>Trello</h1></Link>
            </nav>
        </header>
    )
}