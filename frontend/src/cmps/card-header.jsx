import { useState } from "react"


export function CardHeader({ card, getGroup, onChangeTitle }) {
    const [title, setTitle] = useState(card.title)

    function handleChange({ target }) {
        let { value } = target
        setTitle(prevTitle => value)
    }

    const group = getGroup()

    return <div className="card-header">
        <span className="icon fa card-icon"></span>

        <form onSubmit={(ev) => onChangeTitle(title, ev)}>
            <input className="title"
                suppressContentEditableWarning={true}
                contentEditable={true}
                value={title}
                onBlur={() => onChangeTitle(title)}
                onChange={handleChange} />
        </form>

        <div>
            <p className="group-show">in group: {group.title}</p>
        </div>
    </div>
}