import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { BoardIndex } from './pages/board-index.jsx'
import { CardDetails } from './pages/card-details.jsx'
import { Boards } from './pages/boards.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home',
    },
    {
        path: 'board',
        component: <Boards />,
        label: 'Boards'
    },
    {
        path: 'about',
        component: <AboutUs />,
        label: 'About us'
    },
    {
        path: 'card/:id',
        component: <CardDetails />,
        label: 'Card'
    }
]

export default routes