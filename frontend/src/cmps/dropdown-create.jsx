import { Link } from "react-router-dom"
import groupsImg from '../assets/img/groups-img.svg'

export function DropdownCreate() {

    return (
        <section onClick={(ev) => ev.stopPropagation()} className="dropdown dropdown-create">
            <h3>Create board</h3>

            <section className="img-container">
                <div className="img-background">
                    <img src={groupsImg} alt="Groups image" />
                </div>
            </section>

            <form>
                <input type="text" />
                <button>Create</button>
            </form>
        </section>
    )
}