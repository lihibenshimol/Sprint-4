import { useState } from "react"


export function CardDescription({ card, submitDetail, isDescriptionEdit, setIsDescriptionEdit }) {
    const [describe, setDescribe] = useState(card.describe)

    function onIsDescriptionEdit() {
        setIsDescriptionEdit(prevState => !prevState)
    }

    function handleChange({ target }) {
        let { value, name: filed } = target
        console.log('value: ', value)
        setDescribe(prevDescribe => value)
    }

    function onSubmitDetails(ev) {
        ev.preventDefault()
        submitDetail(describe)
    }

    return (<>
        {
            !isDescriptionEdit &&
            <p onClick={onIsDescriptionEdit} className="hover">{(card.describe) ? card.describe : `Add a more detailed description…`}</p>
        }
        {
            isDescriptionEdit && (
                // <div >
                <form onSubmit={onSubmitDetails} className="description-editor">
                    <textarea
                        type="text"
                        id="body"
                        name="body"
                        value={card.describe}
                        onChange={handleChange}
                        placeholder="Add a more detailed description…"
                    >
                    </textarea>
                    <button className="save-btn">Add</button>
                    <button type="button" className="cancel-btn" onClick={onIsDescriptionEdit}>Cancel</button>
                </form>
                // </div>
            )
        }
    </>)
}