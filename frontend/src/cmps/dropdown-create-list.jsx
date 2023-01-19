import { useState } from "react"
import { DropdownCreate } from "./dropdown-create"

export function DropdownCreateList({setDropDown}) {

    const [isAddingBoard, setAddingBoard] = useState(false)


    if (isAddingBoard) return <DropdownCreate setDropDown={setDropDown} setAddingBoard={setAddingBoard} fromNavbar={true}/>
    return (
        <section onClick={(ev) => ev.stopPropagation()} className="dropdown dropdown-create-list">
            <article onClick={() => setAddingBoard(prevAddingBoard => !prevAddingBoard)}>
                <h4><i className="fa-brands trello"></i>Create board</h4>
                <p>A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.</p>
            </article>
        </section>
    )
}