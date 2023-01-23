import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../store/user.actions"

export function DropdownUser({ setDropDown }) {

    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)

    function onLogin() {
        navigate('/login')
    }

    async function onLogout() {
        try {
            await logout()
            navigate('/login')
        } catch (err) {
            console.log('Failed to logout, ', err)
        }
    }

    return (
        <section onClick={(ev) => { ev.stopPropagation() }} className='dropdown dropdown-user'>
            <label>Account</label>
            {!user && <div onClick={onLogin}>Login</div>}
            {user &&
                <section className="user-info">
                    <img src={user.imgUrl} alt={user.username} />
                    <span>{user.fullname}</span>
                </section>
            }
            {user && <div onClick={onLogout}>Log out</div>}
        </section>
    )
}