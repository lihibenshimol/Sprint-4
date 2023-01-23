import { useState } from "react"
import { BsCheck } from 'react-icons/bs'



export function MemberOption({ card, board, member, handleChange, addOrDeleteMember }) {


    function handleChange() {
        addOrDeleteMember(member)
    }

    function memberIsCheck(entity) {
        const idx = entity.members.findIndex(m => m._id === member._id)
        // const idx = card.members.findIndex(m => m._id === member._id)

        if (idx !== -1) return false
        return true
    }

    if (member.isChecked === true) return
    return (
        <li className="flex " onClick={handleChange}>
            <label>
                <div className='flex'>
                    <img src={`${member.imgUrl}`} alt="member" className='member-avatar' />
                    <span>{member.fullname}</span>

                </div>
                {card && <span>{memberIsCheck(card) ? '' : <BsCheck />}</span>}
                {!card && <span>{memberIsCheck(board) ? '' : <BsCheck />}</span>}
            </label>
        </li>
    )

}