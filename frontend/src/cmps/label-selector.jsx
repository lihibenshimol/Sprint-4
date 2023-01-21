import { useSelector } from "react-redux"
import { RxCross2 } from 'react-icons/rx';
import { LabelOption } from "./label-option";


export function LabelsSelect({ addOrDeleteLabel, openLabelsSelect, labelsSelect }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)


    return (
        <div className="extras-menu flex">
            <span className="title-container">
                <p>
                    Labels
                </p>
                <span className='close-btn hover' onClick={() => openLabelsSelect(!labelsSelect)}><RxCross2 /></span>
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