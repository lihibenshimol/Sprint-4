import { useSelector } from "react-redux"


export function MembersSelect({ }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)



    return (
        <div className="extras-content-members">
            <input type="text" className='search-input'
                placeholder='Search members'
                title='not available right now' />

            <ul className='member-selector'>
                {board.members.map(m => {
                    return (
                        <li key={m._id} className="flex ">
                            <label>
                                <div className='flex'>
                                    <img src={`${m.imgUrl}`} alt="member" className='member-avatar' />
                                    <span>{m.fullname}</span>
                                    <input type="checkbox" />
                                </div>
                                <span>V</span>
                            </label>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}