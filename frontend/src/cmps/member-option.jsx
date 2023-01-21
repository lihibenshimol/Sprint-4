import { useState } from "react"


export function MemberOption({ member, handleChange, addOrDeleteMember }) {
    const [checked, setChecked] = useState(member.isChecked)

    function handleChange() {
        setChecked(!checked)
        addOrDeleteMember(member)
    }

    return (
        <li className="flex " onClick={handleChange}>
            <label>
                <div className='flex'>
                    <img src={`${member.imgUrl}`} alt="member" className='member-avatar' />
                    <span>{member.fullname}</span>
                
                </div>
                <span>{member.isChecked ? 'v' : ''}</span>
            </label>
        </li>
    )

}