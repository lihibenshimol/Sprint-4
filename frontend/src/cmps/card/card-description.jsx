import { useEffect, useRef, useState } from "react"
import { BsTextLeft } from "react-icons/bs"

export function CardDescription({ card, onSaveDesc, isDescriptionEdit, setIsDescriptionEdit }) {
    const [desc, setDesc] = useState(card.desc)

    function onIsDescriptionEdit() {
        setIsDescriptionEdit(!isDescriptionEdit)
    }

    function cancelEdit() {
        setIsDescriptionEdit(!isDescriptionEdit)
        setDesc(prevDesc => card.desc)
    }

    function handleChange({ target }) {
        let { value, name: filed } = target
        setDesc(prevDesc => value)
    }

    function onSubmitDetails(ev) {
        ev.preventDefault()
        onSaveDesc(desc)
    }

    return (
        <section className="card-description">
            <div className="section-header">
                <span><BsTextLeft /></span>
                <h3>Description</h3>
                {(!isDescriptionEdit && card.desc) && <button onClick={setIsDescriptionEdit}>Edit</button>}
            </div>

            {
                !isDescriptionEdit &&
                <p onClick={onIsDescriptionEdit} className="hover">{(card.desc) ? card.desc : `Add a more detailed description…`}</p>
            }
            {
                isDescriptionEdit && (
                    <form onSubmit={onSubmitDetails} className="description-editor">
                        <textarea
                            type="text"
                            id="body"
                            name="body"
                            value={desc}
                            onChange={handleChange}
                            placeholder="Add a more detailed description…"

                        >
                        </textarea>
                        <button className="save-btn">Add</button>
                        <button type="button" className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                    </form>
                )
            }
        </section>
    )
}