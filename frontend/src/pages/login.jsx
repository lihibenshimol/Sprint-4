import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { userService } from "../services/user.service"
import { login } from "../store/user.actions"
import { Link } from 'react-router-dom'
import ls1 from '../assets/img/ls1.svg'
import ls2 from '../assets/img/ls2.svg'

export function Login() {

    const [user, setUser] = useState(userService.getEmptyUser())
    const navigate = useNavigate()

    async function onLogin(ev) {
        ev.preventDefault()
        if (!user.password || !user.username) return
        try {
            await login(user)
            navigate('/board')
        } catch (err) {
            console.log('Failed to signup; ', err)
        }
    }

    function handleChange({ target }) {
        const { value, name: field } = target
        setUser(prevUser => ({ ...prevUser, [field]: value }))
    }

    return (
        <section className="login-signup">
            <form onSubmit={onLogin}>
                <h2>Log in to Taskello</h2>
                <input name="username" value={user.username} onChange={handleChange} type="text" placeholder="Enter username" />
                <input name="password" value={user.password} onChange={handleChange} type="password" placeholder="Enter password" />
                <button>Login</button>
            </form>
            <hr />
            <Link to='/signup'>Sign up for an account</Link>
            <img src={ls1} alt="" />
            <img src={ls2} alt="" />
        </section>
    )
}