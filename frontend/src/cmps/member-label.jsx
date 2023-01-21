import { useState } from "react"


export function MemberLabel({ member, handleChange, addMember, removeMember }) {
    const [checked, setChecked] = useState(true)

    // function onHandleChange() {
    //     handleChange(!checked)
    // }

    function handleChange(member) {
        setChecked(!checked)
        // console.log('checked: ', checked)

        checked ? onAddMember(member) : onRemoveMember(member)
    }

    function onAddMember(member) {
        if (!checked) return
        addMember(member)
    }

    function onRemoveMember(member) {
        if (checked) return
        removeMember(member)
    }

    return (
        <li className="flex ">
            <label>
                <div className='flex'>
                    <img src={`${member.imgUrl}`} alt="member" className='member-avatar' />
                    <span>{member.fullname}</span>
                    <input type="checkbox"
                        onChange={() => handleChange(member)}
                        value={checked}
                    />
                </div>
                <span>{!checked ? 'v' : ''}</span>
            </label>
        </li>
    )

}