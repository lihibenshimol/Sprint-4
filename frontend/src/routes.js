import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { BoardIndex } from './pages/board-index.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    {
        path: 'board',
        component: <BoardIndex />,
        label: 'Boards'
    },
    {
        path: 'about',
        component: <AboutUs />,
        label: 'About us'
    }
]

export default routes