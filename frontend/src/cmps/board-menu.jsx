import { useState } from "react";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { loadActivities } from "../store/activity.actions";


export function BoardMenu({ isOpenMenu, setIsOpenMenu, board }) {
    const [activities, setActivities] = useState()

    useEffect(() => {
        onloadActivities()
    }, [])

    function onloadActivities() {
        loadActivities()

    }

    return (
        <div className="extras-board-menu flex" >
            <span className="title-container">
                <h3>
                    Menu
                </h3>
                <span className='close-btn hover' onClick={() => setIsOpenMenu(!isOpenMenu)}><RxCross2 /></span>
            </span>
            <div className="extras-content-menu">
                <label className="label-option bg-select">
                    <span className="icon" style={board.style}></span>
                    Background Color
                </label>
                <hr />
                <label className="label-option activities-label">
                    <span className="icon" style={board.style}></span>
                    Activities
                </label>

            </div>
        </div>
    )
}