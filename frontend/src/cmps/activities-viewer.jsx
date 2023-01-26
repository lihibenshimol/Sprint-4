import Moment from 'react-moment';
import { useEffect, useState } from 'react';
import { RxActivityLog } from 'react-icons/rx';
import { userService } from '../services/user.service';
const mongoose = require('mongoose')

export function ActivitiesViewer({ activity }) {
    const { byUser, onMember, txt } = activity
    const activityId = activity._id


    function getActivityCreatedAt() {
        const objectId = mongoose.Types.ObjectId(activityId)
        const timestamp = objectId.getTimestamp().toISOString()
        return timestamp
    }

    return (
        <>

            <span className='activity-user-img'>
                <img src={onMember?.imgUrl} alt="" />
            </span>

            <section className='activity-msg'>
                <div>
                    <span className='activity-member'>
                        {onMember?.fullname}
                    </span>
                    <span>
                        {txt}
                    </span>
                </div>
                <span className='activity-timestamp'>
                    <Moment format="MMM DD hh:mm A">{getActivityCreatedAt()}</Moment>
                </span>
            </section>

        </>
    )
}








