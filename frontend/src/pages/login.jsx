import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { userService } from "../services/user.service"
import { login } from "../store/user.actions"

export function Login() {

    const [user, setUser] = useState(userService.getEmptyUser())
    const navigate = useNavigate()

    async function onLogin(ev) {
        ev.preventDefault()
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
                <input name="username" value={user.username} onChange={handleChange} type="text" placeholder="Enter username" />
                <input name="password" value={user.password} onChange={handleChange} type="password" placeholder="Enter password" />
                <button>Login</button>
            </form>
        </section>
    )
}