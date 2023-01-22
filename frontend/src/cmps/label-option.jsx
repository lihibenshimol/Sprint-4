import { useState } from "react"


export function LabelOption({ card, label, addOrDeleteLabel }) {


    function handleChange() {
        addOrDeleteLabel(label)
    }

    function labelIsCheck() {
        const idx = card.labels.findIndex(l => l.id === label.id)

        if (idx !== -1) return false
        return true
    }

    return (
        <li className="flex " onClick={handleChange}>
            <label>
                <span className={`${labelIsCheck() ? "un-checked" : 'checked'}`}></span>
                <div className='flex clr-box' style={{ backgroundColor: label.color + '40' }}>
                    <div className="clr-dot" style={{ backgroundColor: label.color }}></div>
                    <span>{label.title}</span>

                </div>
            </label>
        </li >
    )
}