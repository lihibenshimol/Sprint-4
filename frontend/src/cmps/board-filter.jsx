import { useRef } from "react"
import { useEffect } from "react"
import { RxCross2 } from "react-icons/rx"
import { useSelector } from "react-redux"
import { MemberOption } from "./member-option"
import { FilterByUser } from "./filter-by-user"


export function BoardFilter({ pos, isFilterMode, setIsFilterMode }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const dropdownRef = useRef(null)

    useEffect(() => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect()
            if (rect.width + pos.right >= window.innerWidth) {
                dropdownRef.current.style = `left:${pos.left - rect.width - 10}px`
            } else {
                console.log('pos = ', pos)
                dropdownRef.current.style = `left:${pos.right + 400}px; top:${pos.top + 30}px`
            }
        }
    }, [dropdownRef])



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
                    {board.members?.map(m =>  <FilterByUser
                            member={m}
                            key={m._id}
                            board={board}
                        />
                    )}
                </ul>}
            </div>
        </div >
    )
}