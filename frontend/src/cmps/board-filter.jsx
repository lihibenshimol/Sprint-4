import { useRef } from "react"
import { useEffect } from "react"
import { RxCross2 } from "react-icons/rx"
import { useSelector } from "react-redux"
import { MemberOption } from "./member-option"


export function BoardFilter({ pos, isFilterMode, setIsFilterMode }) {

    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const dropdownRef = useRef(null)

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
                <span className='close-btn hover' onClick={() => setIsFilterMode(!isFilterMode)}><RxCross2 /></span>
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
                            // card={card}
                            // addOrDeleteMember={addOrDeleteMember}
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