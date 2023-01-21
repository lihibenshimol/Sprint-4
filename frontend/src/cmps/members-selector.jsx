import { useSelector } from "react-redux"
import { MemberLabel } from "./member-label"
import { RxCross2 } from 'react-icons/rx';


export function MembersSelect({ checkAddOrRemove }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)

    return (
        <div className="extras-menu flex">
            <span className="title-container">
                <p>
                    Members
                </p>
                <a className='close-btn'><RxCross2 /></a>
            </span>
            <div className="extras-content-members">
                <input type="text" className='search-input'
                    placeholder='Search members'
                    title='not available right now' />

                <ul className='member-selector'>
                    {board.members.map(m => {
                        return <MemberLabel
                            checkAddOrRemove={checkAddOrRemove}
                            member={m}
                            key={m._id}
                        />

                    })}
                </ul>
            </div>
        </div>
    )
}