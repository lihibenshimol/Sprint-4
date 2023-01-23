import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react"
import { Calendar } from "react-calendar"
import { RxCross2 } from "react-icons/rx"
import 'react-calendar/dist/Calendar.css';



export function DateSelector({ pos, isDropDownOpen, setIsDropDownOpen }) {
    const [date, setDate] = useState(new Date())
    const [dateToShow, setDateToShow] = useState(date)
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


    function onChange(date) {
        setDate(date)
    }

    function onChangeFromInput({ target }) {
        const { valueAsNumber } = target
        console.log('value: ', valueAsNumber)
    }

    function onSubmit(ev) {
        ev.preventDeafult()


    }

    return (
        <div className="extras-menu flex" ref={dropdownRef}>
            <span className="title-container">
                <p>
                    Dates
                </p>
                <span className='close-btn hover' onClick={() => setIsDropDownOpen(!isDropDownOpen)}><RxCross2 /></span>
            </span>
            <div className="extras-content-dates">
                <div className="calender">

                    <Calendar
                        calendarType='US'
                        className="class2"
                        onChange={onChange}
                        value={date}
                    />

                </div>
                <h4>Due date</h4>
                <h5>{date.toLocaleDateString()}</h5>
                {/* <input type="date"
                    onChange={onChangeFromInput}
                value={date.toLocaleDateString()}
                placeholder={date}                /> */}
            </div>
        </div>



    )



}