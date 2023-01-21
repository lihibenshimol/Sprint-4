import { useState } from "react"


export function MemberLabel({ member, handleChange }) {
    const [checked, setChecked] = useState(false)

    // function onHandleChange() {
    //     handleChange(!checked)
    // }

    function handleChange() {
        setChecked(!checked)
    }


    return (
        <li className="flex ">
            <label>
                <div className='flex'>
                    <img src={`${member.imgUrl}`} alt="member" className='member-avatar' />
                    <span>{member.fullname}</span>
                    <input type="checkbox"
                        onChange={handleChange}
                        value={checked}
                    />
                </div>
                <span>{checked ? 'v' : ''}</span>
            </label>
        </li>
    )

}