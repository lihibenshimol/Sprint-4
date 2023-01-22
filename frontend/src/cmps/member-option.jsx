import { useState } from "react"


export function MemberOption({ card, member, handleChange, addOrDeleteMember }) {

    function handleChange() {
        addOrDeleteMember(member)
    }

    function memberIsCheck() {
        const idx = card.members.findIndex(m => m._id === member._id)

        if (idx !== -1) return false
        return true
    }

    return (
        <li className="flex " onClick={handleChange}>
            <label>
                <div className='flex'>
                    <img src={`${member.imgUrl}`} alt="member" className='member-avatar' />
                    <span>{member.fullname}</span>

                </div>
                <span>{memberIsCheck() ? '' : 'V'}</span>
            </label>
        </li>
    )

}