import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
// import { BoardIndex } from './pages/board-index.jsx'
import { CardDetails } from './pages/card-details.jsx'
import { BoardIndex } from './pages/board-index.jsx'
import { Signup } from './pages/signup.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home',
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
    },
    {
        path: 'login',
        component: <AboutUs />,
        label: 'Login'
    },
    {
        path: 'signup',
        component: <Signup />,
        label: 'Sign up'
    }
]

export default routes