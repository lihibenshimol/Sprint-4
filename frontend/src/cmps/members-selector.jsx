import { useSelector } from "react-redux"
import { MemberLabel } from "./member-label"


export function MembersSelect({ }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)


    // function handleChange() {
    //     setChecked(!checked)
    // }

    return (
        <div className="extras-content-members">
            <input type="text" className='search-input'
                placeholder='Search members'
                title='not available right now' />

            <ul className='member-selector'>
                {board.members.map(m => {
                    return <MemberLabel
                        member={m}
                        key={m._id}
                    // handleChange={handleChange}
                    />

                })}
            </ul>
        </div>
    )
}