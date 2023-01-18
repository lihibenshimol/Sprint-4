import { Link, NavLink } from 'react-router-dom'

export function AppHeader() {
    // const user = useSelector(storeState => storeState.userModule.user)

    // async function onLogin(credentials) {
    //     try {
    //         const user = await login(credentials)
    //         showSuccessMsg(`Welcome: ${user.fullname}`)
    //     } catch(err) {
    //         showErrorMsg('Cannot login')
    //     }
    // }
    // async function onSignup(credentials) {
    //     try {
    //         const user = await signup(credentials)
    //         showSuccessMsg(`Welcome new user: ${user.fullname}`)
    //     } catch(err) {
    //         showErrorMsg('Cannot signup')
    //     }
    // }
    // async function onLogout() {
    //     try {
    //         await logout()
    //         showSuccessMsg(`Bye now`)
    //     } catch(err) {
    //         showErrorMsg('Cannot logout')
    //     }
    // }
    return (
        <header className="app-header full flex space-between align-center main-container">

            <nav className='flex align-center'>
                <Link to="/board"><h1>Trello</h1></Link>
                <button>Boards<i class="fa down-arrow"></i></button>
                <button>Recent<i class="fa down-arrow"></i></button>
                <button>Starred<i class="fa down-arrow"></i></button>
                <button>Templates<i class="fa down-arrow"></i></button>
                <button className='create-btn'>Create</button>
            </nav>

        </header>
    )
}