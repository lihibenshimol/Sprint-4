import Moment from 'react-moment';
import { useEffect, useState } from 'react';
import { RxActivityLog } from 'react-icons/rx';
import { userService } from '../services/user.service';
const mongoose = require('mongoose')

export function ActivitiesViewer({ activities }) {
    const [activitiesDisplay, toggleActivitiesDisplay] = useState(true)

    function getActivityCreatedAt(activityId) {
        const objectId = mongoose.Types.ObjectId(activityId)
        const timestamp = objectId.getTimestamp().toISOString()
        return timestamp
    }

    return (
        <>
            <div className="activities-viewer">
                <section className="activities-header">
                    <span className="title">
                        <span className="activities-icon">  <RxActivityLog /> </span>
                        <h3> Activity </h3>
                    </span>
                    <button className="btn" onClick={() => toggleActivitiesDisplay(!activitiesDisplay)}> {activitiesDisplay ? 'Hide Details' : 'Show Details'}</button>
                </section>

                <div className='activities-container'>

            {activitiesDisplay && activities?.map(activity => <div key={activity._id} className='activity-details'>
                <span className='activity-user-img'>
                    <img src={activity.onMember?.imgUrl} alt="" />
                </span>

                <section className='activity-msg'>
                    <div>
                        <span className='activity-member'>
                            {activity.onMember?.fullname}
                        </span>
                        <span>
                            {activity.txt}
                        </span>
                    </div>
                    <span className='activity-timestamp'>
                        <Moment format="MMM DD hh:mm A">{getActivityCreatedAt(activity._id)}</Moment>
                    </span>
                </section>
            </div>
            )}
            </div>
            </div>
        </>
    )
}








