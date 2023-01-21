import { useState } from "react"


export function LabelOption({ label, addOrDeleteLabel }) {

    const [checked, setChecked] = useState(label.isChecked)

    function handleChange() {
        setChecked(!checked)
        addOrDeleteLabel(label)
    }

    return (
        <li className="flex " onClick={handleChange}>
            <label>
                <span className={`${checked ? "checked" : 'un-checked'}`}></span>
                <div className='flex clr-box' style={{ backgroundColor: label.color + '40' }}>
                    <div className="clr-dot" style={{ backgroundColor: label.color }}></div>
                    <span>{label.title}</span>

                </div>
            </label>
        </li >
    )
}