import { useSelector } from "react-redux"
import { RxCross2 } from 'react-icons/rx';
import { LabelOption } from "./label-option";
import { useRef } from "react";
import { useEffect } from "react";


export function LabelsSelect({ pos, card, addOrDeleteLabel, setIsDropDownOpen, isDropDownOpen }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const dropdownRef = useRef(null)

    useEffect(() => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect()
            if (rect.width + pos.right >= window.innerWidth) {
                dropdownRef.current.style = `left:${pos.left - rect.width - 10}px`
            } else {
                dropdownRef.current.style = `left:${pos.right + 10}px`
                // dropdownRef.current.style = `top:0p=`
            }
        }
    }, [dropdownRef])



    return (
        <div className="extras-menu flex" ref={dropdownRef} >
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