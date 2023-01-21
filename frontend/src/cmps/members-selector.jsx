import { useSelector } from "react-redux"
import { MemberLabel } from "./member-label"
import { RxCross2 } from 'react-icons/rx';


export function MembersSelect({ checkAddOrRemove, openMembersSelect, membersSelect }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)


    return (
        <div className="extras-menu flex">
            <span className="title-container">
                <p>
                    Members
                </p>
                <span className='close-btn hover' onClick={() => openMembersSelect(!membersSelect)}><RxCross2 /></span>
            </span>
            <div className="extras-content-members">
                <input type="text" className='search-input'
                    placeholder='Search members'
                    title='not available right now' />


                {board.members && <ul className='member-selector' >
                    {board.members?.map(m => {
                        return <MemberLabel
                            checkAddOrRemove={checkAddOrRemove}
                            member={m}
                            key={m._id}
                        />

                    })}
                </ul>}
            </div>
        </div>
    )
}