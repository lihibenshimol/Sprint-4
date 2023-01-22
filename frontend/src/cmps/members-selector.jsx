import { useSelector } from "react-redux"
import { MemberOption } from "./member-option"
import { RxCross2 } from 'react-icons/rx';
import { utilService } from "../services/util.service";


export function MembersSelect({ card, addOrDeleteMember, openMembersSelect, membersSelect }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)


    return (
        <div className="extras-menu flex" >
            <span className="title-container">
                <p>
                    Members
                </p>
                <span className='close-btn hover' onClick={() => openMembersSelect(!membersSelect)}><RxCross2 /></span>
            </span>
            <div className="extras-content-members">
                <input type="text" className='search-input'
                    placeholder='Search members'
                    title='not available right now'
                    disabled />

                <h4>Board members</h4>

                {board.members && <ul className='member-selector' >
                    {board.members?.map(m => {
                        return <MemberOption
                            card={card}
                            addOrDeleteMember={addOrDeleteMember}
                            member={m}
                            key={m._id}
                        />

                    })}
                </ul>}
            </div>
        </div>
    )
}