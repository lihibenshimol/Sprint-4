import { useSelector } from "react-redux"
import { RxCross2 } from 'react-icons/rx';
import { LabelOption } from "./label-option";
import { useRef } from "react";


export function LabelsSelect({ pos, card, addOrDeleteLabel, setIsDropDownOpen, isDropDownOpen }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const windowWidth = useRef(window.innerWidth);
    const windowHeight = useRef(window.innerHeight);

    function setNewPos() {
        // console.log('width: ', windowWidth.current);
        // console.log('height: ', windowHeight.current);
        let newPos = { ...pos }
        
        // if (pos.left + 305 > windowWidth.current) newPos.right = 0
        if (pos.top + 500 > windowHeight.current) newPos.top = 0

        return newPos
    }



    return (
        <div className="extras-menu flex" style={setNewPos()}>
            <span className="title-container">
                <p>
                    Labels
                </p>
                <span className='close-btn hover' onClick={() => setIsDropDownOpen(!isDropDownOpen)}><RxCross2 /></span>
            </span>
            <div className="extras-content-labels">
                <input type="text" className='search-input'
                    placeholder='Search labels...'
                    title='Not available right now'
                    disabled />

                <h4>Labels</h4>


                {board.labels && <ul className='label-selector' >
                    {board.labels?.map(l => {
                        return <LabelOption
                            card={card}
                            addOrDeleteLabel={addOrDeleteLabel}
                            label={l}
                            key={l.id}
                        />

                    })}
                </ul>}

                <button title={'Not available right now'}
                    disabled>Create new label</button>
            </div>
        </div>
    )
}