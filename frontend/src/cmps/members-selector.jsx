import { useSelector } from "react-redux"
import { MemberOption } from "./member-option"
import { RxCross2 } from 'react-icons/rx';
import { utilService } from "../services/util.service";
import { useRef, useEffect } from "react";
import { useState } from "react";


export function MembersSelect({ card, pos, addOrDeleteMember, setIsDropDownOpen, isDropDownOpen }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const [members, setMembers] = useState(board.members)
    const [filterBy, setFilterBy] = useState('')

    const dropdownRef = useRef(null)

    useEffect(() => {
        loadMember()
    }, [filterBy])

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

    function loadMember() {
        const regex = new RegExp(filterBy, 'i')
        const membersToSet = board.members.filter(m => regex.test(m.fullname))
        setMembers(membersToSet)
    }

    function onChange({ target }) {
        const { value } = target
        setFilterBy(value)
    }


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
                    value={filterBy}
                    onChange={onChange}
                />

                <h4>Board members</h4>

                {members && <ul className='member-selector' >
                    {members?.map(m => {
                        return <MemberOption
                            card={card}
                            addOrDeleteMember={addOrDeleteMember}
                            member={m}
                            key={m._id}
                            board={board}
                        />
                    })}
                </ul>}
            </div>
        </div >
    )
}