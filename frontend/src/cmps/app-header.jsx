import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DropDown } from './dropdown'
import { FastAverageColor } from 'fast-average-color'
import { useSelector } from 'react-redux'

export function AppHeader() {

    const [dropdown, setDropDown] = useState({})
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const [navColor, setNavColor] = useState('rgba(0, 0, 0 ,0.5)')
    console.log(board)
    const location = useLocation()
    const fac = new FastAverageColor()

    useEffect(() => {
        if (board?.style?.backgroundImage) {
            const url = board.style.backgroundImage.slice(4, -1)
            fac.getColorAsync(url)
                .then(color => {
                    console.log(color)
                    setNavColor(color.hex)
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            setNavColor('rgba(0, 0, 0 ,0.5)')
        }
    }, [board])

    useEffect(() => {
        document.body.onclick = ({ target }) => {
            // weird solution which i don't like to be fairy honest
            if (target.parentElement?.classList?.contains('main-nav') ||
                target?.parentElement?.parentElement?.classList?.contains('main-nav') &&
                !target.classList.contains('brand')) return
            setDropDown({})
        }

        return () => {
            document.body.onclick = () => { }
        }
    }, [])
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

    function onShowDropdown(type) {
        if (dropdown.type === type) setDropDown({})
        else setDropDown({ type })
    }

    function isInBoardDetails() {
        return location.pathname.includes('/board/')
    }

    return (
        <header style={isInBoardDetails() ? { backgroundColor: navColor } : {}} className="app-header full flex space-between align-center main-container">

            <nav className='flex align-center main-nav'>
                <Link to="/board"><h1 className='brand'>Trello</h1></Link>
                <button className={dropdown.type === 'boards' ? 'active' : ''} onClick={() => onShowDropdown('boards')}>Boards<i className="fa down-arrow"></i>
                    {dropdown.type === 'boards' && <DropDown setDropDown={setDropDown} type={dropdown.type} />}
                </button>

                <button onClick={() => onShowDropdown('recent')} className={dropdown.type === 'recent' ? 'active' : ''}>Recent<i className="fa down-arrow"></i>
                    {dropdown.type === 'recent' && <DropDown type={dropdown.type} />}
                </button>

                <button onClick={() => onShowDropdown('starred')} className={dropdown.type === 'starred' ? 'active' : ''}>Starred<i className="fa down-arrow"></i>
                    {dropdown.type === 'starred' && <DropDown type={dropdown.type} />}
                </button>

                <button onClick={() => onShowDropdown('templates')} className={dropdown.type === 'templates' ? 'active' : ''}>Templates<i className="fa down-arrow"></i>
                    {dropdown.type === 'templates' && <DropDown type={dropdown.type} />}
                </button>

                <div onClick={() => onShowDropdown('create-list')} className={dropdown.type === 'create-list' ? 'create-btn active' : 'create-btn'}>Create
                    {dropdown.type === 'create-list' && <DropDown setDropDown={setDropDown} type={dropdown.type} />}
                </div>
            </nav>

        </header>
    )
}