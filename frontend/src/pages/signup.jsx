export function Signup() {

    function onSignUp(ev) {
        ev.preventDefault()
    }

    return (
        <section className="login-signup">
            <form onSubmit={onSignUp}>
                <input type="text" placeholder="Enter full name" />
                <input type="text" placeholder="Enter username" />
                <input type="password" placeholder="Enter password" />
                <button>Sign up</button>
            </form>
        </section>
    )
}