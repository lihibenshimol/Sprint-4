import { useEffect, useState } from 'react';
import { RxActivityLog } from 'react-icons/rx';
import { userService } from '../services/user.service';

export function ActivitiesViewer({ activity }) {
    const [user, setUser] = useState(null)


    useEffect(() => {
        getUser(activity.byUserId)
    }, [])

    async function getUser(userId) {
        try {
          const user =  await userService.getById(userId)
            setUser(user)
        } catch (err) {
            console.log('err = ', err)
        }
    }


    return (
        <>
                {/* {user?.fullname} */}
            {activity.txt}
        </>
    )
}








