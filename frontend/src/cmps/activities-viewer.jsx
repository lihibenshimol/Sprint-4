import { useEffect, useState } from 'react';
import { RxActivityLog } from 'react-icons/rx';
import { userService } from '../services/user.service';

export function ActivitiesViewer({ activity }) {
    const {byUser, onMember, txt} = activity

    return (
        <>
            <div>
                {/* <img src={byUser.imgUrl} alt="" /> */}
            {txt}
            </div>
        </>
    )
}








