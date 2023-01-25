import { useState } from "react";
import { useEffect } from "react";
import { RxActivityLog, RxCross2 } from "react-icons/rx";
import { loadActivities } from "../store/activity.actions";
import Moment from 'react-moment';


export function BoardMenu({ isOpenMenu, setIsOpenMenu, board }) {
    const [activities, setActivities] = useState([])

    useEffect(() => {
        onloadActivities()
    }, [])

    async function onloadActivities() {
        try {
            const activities = await loadActivities()
            setActivities(activities)
        } catch (err) {
            console.log('Cant load activities')

        }
    }


    function logg() {
        console.log('activities: ', activities)

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
                    Change background
                </label>
                <hr />
                <label className="label-option activities-label" onClick={logg}>
                    <span className="icon"><RxActivityLog /> </span>
                    Activities
                </label>

                <article className="activity-container">
                    <div className="user-activity-img"></div>
                    <div className="activity-desc">
                        <h4>User name </h4>
                        <p>Join to group</p>
                    </div>
                    <div className="activity-time">
                        <Moment interval={10000} fromNow></Moment>
                    </div>
                </article>

            </div>
        </div>
    )
}