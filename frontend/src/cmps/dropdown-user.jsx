import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { loadBoards } from "../store/board.actions"

export function DropdownUser({ setDropDown }) {

    const navigate = useNavigate()


    function handleLinkClick(ev, boardId) {
        ev.preventDefault()
        navigate(`/board/${boardId}`)
        setDropDown({})
    }

    return (
        <section onClick={(ev) => ev.stopPropagation()} className="dropdown dropdown-boards">

            <h2>hello</h2>

        </section>
    )
}