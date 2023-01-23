import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react"
import { Calendar } from "react-calendar"
import { RxCross2 } from "react-icons/rx"
import 'react-calendar/dist/Calendar.css';



export function DateSelector({ pos, isDropDownOpen, setIsDropDownOpen }) {
    const [value, onChange] = useState(new Date())
    const dropdownRef = useRef(null)

    useEffect(() => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect()
            console.log('rect: ', rect)

            if (rect.width + pos.right >= window.innerWidth) {
                dropdownRef.current.style = `left:${pos.left - rect.width - 10}px`
            } else {
                dropdownRef.current.style = `left:${pos.right + 10}px`
            }
        }
    }, [dropdownRef])


    return (
        <div className="extras-menu flex" ref={dropdownRef}>
            <span className="title-container">
                <p>
                    Labels
                </p>
                <span className='close-btn hover' onClick={() => setIsDropDownOpen(!isDropDownOpen)}><RxCross2 /></span>
            </span>
            <div className="extras-content-dates">
                <h4>Dates</h4>
                <div className="calender">

                    <Calendar calendarType='US' className="class2" onChange={onChange} value={value} />

                </div>
            </div>
        </div>



    )



}