import { RxCross2 } from "react-icons/rx";


export function BoardMenu({ isOpenMenu, setIsOpenMenu, board }) {
    console.log('board: ', board)


    return (
        <div className="extras-board-menu flex" >
            <span className="title-container">
                <h3>
                    Menu
                </h3>
                <span className='close-btn hover' onClick={() => setIsOpenMenu(!isOpenMenu)}><RxCross2 /></span>
            </span>
            <div className="extras-content-menu">
                <label className="bg-select">
                    <span className="icon" style={board.style}></span>
                </label>

            </div>
        </div>
    )
}