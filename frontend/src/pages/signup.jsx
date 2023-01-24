import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { userService } from "../services/user.service"
import { signup } from "../store/user.actions"

export function Signup() {

    const [user, setUser] = useState(userService.getEmptyUser())
    const navigate = useNavigate()

    async function onSignUp(ev) {
        ev.preventDefault()
        if (areInputsEmpty()) return
        try {
            await signup(user)
            navigate('/board')
        } catch (err) {
            console.log('Failed to signup; ', err)
        }
    }

    function handleChange({ target }) {
        const { value, name: field } = target
        setUser(prevUser => ({ ...prevUser, [field]: value }))
    }

    function areInputsEmpty() {
        return !user.fullname || !user.username || !user.password
    }

    return (
        <section className="login-signup">
            <form onSubmit={onSignUp}>
                <h2>Sign up for your account</h2>
                <input name="fullname" value={user.fullname} onChange={handleChange} type="text" placeholder="Enter full name" />
                <input name="username" value={user.username} onChange={handleChange} type="text" placeholder="Enter username" />
                <input name="password" value={user.password} onChange={handleChange} type="password" placeholder="Enter password" />
                <button className={areInputsEmpty() ? 'disabled' : ''}>Sign up</button>
            </form>
        </section>
    )
}