import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { loadBoards } from "../store/board.actions"
import { store } from "../store/store"
import { logout } from "../store/user.actions"

export function DropdownUser({ setDropDown }) {

    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)


    function handleLinkClick(ev, boardId) {
        ev.preventDefault()
        navigate(`/board/${boardId}`)
        setDropDown({})
    }

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
            {user && <div onClick={onLogout}>Log out</div>}
        </section>
    )
}