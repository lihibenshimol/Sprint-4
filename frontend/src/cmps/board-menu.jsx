import { useState } from "react";
import { useEffect } from "react";
import { RxActivityLog, RxCross2 } from "react-icons/rx";
import { loadActivities } from "../store/activity.actions";
import Moment from 'react-moment';
import { useSelector } from "react-redux";
import { boardService } from "../services/board.service";
import { IoIosArrowBack } from "react-icons/io";
import { updateBoard } from "../store/board.actions";
import { socketService, SOCKET_EMIT_BOARD_UPDATED } from "../services/socket.service";
import bgImg1 from '../assets/img/bg-img-1.jpg'
import bgImg2 from '../assets/img/bg-img-2.jpg'
import bgImg3 from '../assets/img/bg-img-3.jpg'
import { ActivitiesViewer } from "./activities-viewer";

export function BoardMenu({ isOpenMenu, setIsOpenMenu, board }) {
    const [isPickClrMode, setIsPickClrMode] = useState(false)
    const { activities } = useSelector(storeState => storeState.activityModule)

    const color = boardService.getBoardColors()

    useEffect(() => {
        loadActivities()
    }, [isOpenMenu])

    async function onSetClr(clr) {
        try {
            board.style = { backgroundColor: clr, backgroundImage: null }
            const savedBoard = await updateBoard(board)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Cant update board color')
        }
    }

    async function onSetImg(img) {
        const url = `url(${img})`
        try {
            board.style = { backgroundColor: null, backgroundImage: url }
            const savedBoard = await updateBoard(board)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Cant update board color')
        }
    }

    return (
        <div className="extras-board-menu flex" >
            <span className="title-container">
                <h3>
                    {!isPickClrMode ? 'Menu' : 'Change background'}
                </h3>
                <span className='close-btn menu-btn hover' onClick={() => setIsOpenMenu(!isOpenMenu)}><RxCross2 /></span>
                {isPickClrMode && <span className='back-btn menu-btn hover' onClick={() => setIsPickClrMode(!isPickClrMode)}><IoIosArrowBack /></span>}
            </span>
            <div className="extras-content-menu">

                {isPickClrMode && <section className="clr-container">
                    {color.map(c => {
                        return <div className="clr-btn-large" key={c}
                            onClick={() => onSetClr(c)}
                            style={{ backgroundColor: c }}></div>
                    })}
                    <div className="clr-btn-large"
                        onClick={() => onSetImg(bgImg1)}
                        style={{ backgroundImage: bgImg1 }}>
                        <img src={bgImg1} alt="" />
                    </div>
                    <div className="clr-btn-large"
                        onClick={() => onSetImg(bgImg2)}
                        style={{ backgroundImage: bgImg2 }}>
                        <img src={bgImg2} alt="" />
                    </div>
                    <div className="clr-btn-large"
                        onClick={() => onSetImg(bgImg3)}
                        style={{ backgroundImage: bgImg3 }}>
                        <img src={bgImg3} alt="" />
                    </div>

                </section>}

                {!isPickClrMode && <>
                    <label className="label-option bg-select" onClick={() => setIsPickClrMode(!isPickClrMode)}>
                        <span className="icon" style={board.style}></span>
                        Change background
                    </label>
                    <hr />
                    <label className="label-option activities-label" >
                        <span className="icon"><RxActivityLog /> </span>
                        Activities
                    </label>


                    <ActivitiesViewer
                        activities={activities}
                    />



                </>
                }



            </div>
        </div>
    )
}