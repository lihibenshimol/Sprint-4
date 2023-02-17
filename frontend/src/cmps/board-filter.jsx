import { useRef } from "react"
import { useEffect } from "react"
import { RxCross2 } from "react-icons/rx"
import { useSelector } from "react-redux"
import { MemberOption } from "./member-option"
import { FilterByUser } from "./filter-by-user"


export function BoardFilter({ pos, isFilterMode, setIsFilterMode, setGroupsToDisplay }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const dropdownRef = useRef(null)


    useEffect(() => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect()
            if (rect.width + pos.right >= window.innerWidth) {
                dropdownRef.current.style = `left:${pos.left - rect.width - 10}px`
            } else {
                dropdownRef.current.style = `left:${pos.right + 400}px; top:${pos.top + 30}px`
            }
        }
    }, [dropdownRef])


    function getUserCards(userId) {
        let filteredCards = []
        let newGroups = []
        board.groups.forEach(group => {
            let newG = { ...group, cards: [] }
            group.cards.map(card => {
                if (card.members.filter(member => member._id === userId).length > 0) {
                    newG.cards.push(card)
                }
            })

            newGroups.push(newG)
        })
        setGroupsToDisplay(newGroups)
    }


    return (
        <div className="extras-menu flex" ref={dropdownRef} >
            <span className="title-container">
                <p>
                    Filter Tasks
                </p>
                <span className='close-btn hover' onClick={() => setIsFilterMode(!isFilterMode)}><RxCross2 /></span>
            </span>
            <div className="extras-content-members">
                <input type="text" className='search-input'
                    placeholder='Search members'
                    title='not available right now'
                    disabled />

                <h4>By members</h4>

                {board.members && <ul className='filter-by-user' >
                    <button onClick={() => setGroupsToDisplay(board.groups)}>Clear</button>
                    {board.members?.map(member => <div key={member._id} className="member" onClick={() => getUserCards(member._id)}>
                        <img src={`${member.imgUrl}`} alt="member" className='member-img' />
                        <span>{member.fullname}</span>
                    </div>
                    )}
                </ul>}
                {/* {board.members && <ul className='filter-by-user' >
                    {board.members?.map(m =>  <FilterByUser
                            member={m}
                            key={m._id}
                            board={board}
                            setGroupsToDisplay={setGroupsToDisplay}
                        />
                    )}
                </ul>} */}
            </div>
        </div >
    )
}