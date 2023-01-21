import { useState } from "react"


export function MemberLabel({ member, handleChange, checkAddOrRemove }) {
    const [checked, setChecked] = useState(member.isChecked)


    function handleChange() {
        setChecked(!checked)

        checked ? onAddMember(member) : onRemoveMember(member)
    }


    function onAddMember(member) {
        // if (!checked) return
        checkAddOrRemove(member)
    }

    function onRemoveMember(member) {
        // if (checked) return
        checkAddOrRemove(member)
    }

    return (
        <li className="flex " onClick={handleChange}>
            <label>
                <div className='flex'>
                    <img src={`${member.imgUrl}`} alt="member" className='member-avatar' />
                    <span>{member.fullname}</span>
                    {/* <input type="checkbox"
                        // onChange={handleChange}
                        value={checked}
                    /> */}
                </div>
                <span>{checked ? 'v' : ''}</span>
            </label>
        </li>
    )

}