import { useSelector } from "react-redux"
import { MemberOption } from "./member-option"
import { RxCross2 } from 'react-icons/rx';
import { useRef, useEffect } from "react";
import { userService } from "../services/user.service";
import { loadUsers } from "../store/user.actions";


export function BoardMemberSelect({ pos, addOrDeleteMember, setIsDropDownOpen, isDropDownOpen }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const users = useSelector(storeState => storeState.userModule.users)
    const dropdownRef = useRef(null)

    useEffect(() => {
        loadUsers()
    }, [])




    useEffect(() => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect()
            if (rect.width + pos.right >= window.innerWidth) {
                dropdownRef.current.style = `left:${pos.left - rect.width - 10}px`
            } else {
                dropdownRef.current.style = `left:${pos.right + 10}px`
            }
        }
    }, [dropdownRef])




    return (
        <div className="extras-menu flex" ref={dropdownRef} >
            <span className="title-container">
                <p>
                    Members
                </p>
                <span className='close-btn hover' onClick={() => setIsDropDownOpen(!isDropDownOpen)}><RxCross2 /></span>
            </span>
            <div className="extras-content-members">
                <input type="text" className='search-input'
                    placeholder='Search members'
                    title='not available right now'
                    disabled />

                <h4>Invite members</h4>

                <ul className='member-selector' >
                    {users?.map(m => {
                      
                        return <MemberOption
                            addOrDeleteMember={addOrDeleteMember}
                            member={m}
                            key={m._id}
                            board={board}
                        />
                    })}
                </ul>
            </div>
        </div >
    )
}