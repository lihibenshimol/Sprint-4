import { useEffect, useState } from 'react';
import { RxActivityLog } from 'react-icons/rx';
import { userService } from '../services/user.service';

export function ActivitiesViewer({ activity }) {
    const { byUser, onMember, txt } = activity

    return (
        <>
            <div>
                {/* <span className='activity-user-img' style={{width:'32px', height:'32px'}}>
                    <img src={byUser.imgUrl} alt="" />
                </span> */}
                {txt}
            </div>
        </>
    )
}








