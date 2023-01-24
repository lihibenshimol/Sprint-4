import { RxCross2 } from 'react-icons/rx'

import groupsImg from '../assets/img/groups-img.svg'
import bgImg1 from '../assets/img/bg-img-1.jpg'
import bgImg2 from '../assets/img/bg-img-2.jpg'
import bgImg3 from '../assets/img/bg-img-3.jpg'
import bgImg4 from '../assets/img/bg-img-4.jpg'
import { boardService } from "../services/board.service"
import { useEffect , useRef } from 'react'

export function CardCoverSelector({ pos, onSaveCover, setIsDropDownOpen, isDropDownOpen }) {
    const colors = boardService.getCardCoverColors()
    const dropdownRef = useRef(null)

    useEffect(() => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect()
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
                    Cover
                </p>
                <span className='close-btn hover' onClick={() => setIsDropDownOpen(!isDropDownOpen)}><RxCross2 /></span>
            </span>
            <div className="extras-content-cover">

                <h4>Colors</h4>

                {colors && <ul className='color-selector' >
                    {colors?.map(color => {
                        return <li key={color} className="color-card"
                            style={{ backgroundColor: color }} onClick={() => onSaveCover(color)}>
                        </li>
                    })}
                </ul>}
            </div>
        </div>

    )
}