import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Outlet, } from 'react-router-dom'
import { BoardHeader } from '../cmps/board-header.jsx'
import { BoardMenu } from '../cmps/board-menu.jsx'
import { GroupList } from '../cmps/group-list.jsx'
import { Loader } from '../cmps/loader.jsx'
import { boardService } from "../services/board.service"
import { socketService, SOCKET_EMIT_BOARD_UPDATED, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_BOARD_UPDATED } from '../services/socket.service.js'
import { loadActivities } from '../store/activity.actions.js'
import { getActionUpdateBoard, setCurrBoard, updateBoard } from '../store/board.actions.js'
import { UPDATE_BOARD } from '../store/board.reducer.js'
import { store } from '../store/store.js'

export function BoardDetails() {
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    const { boardId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const dispatch = useDispatch()

    useEffect(() => {
        loadActivities()
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, boardId)
        socketService.on(SOCKET_EVENT_BOARD_UPDATED, (board) => {
            setCurrBoard(board)
        })
        loadBoard()
    }, [boardId])

    async function loadBoard() {
        try {
            const board = await boardService.getById(boardId)
            board.lastViewed = Date.now()
            updateBoard(board)
            setCurrBoard(board)
        } catch (err) {
            console.log('Cannot load board')
        }
    }

    async function onRemoveGroup(groupId) {
        try {
            const updatedBoard = await boardService.removeGroup(board, groupId)
            const savedBoard = await updateBoard(updatedBoard)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Cannot remove group = ', err)
        }
    }

    async function onAddGroup(newGroup) {
        if (!newGroup.title) newGroup.title = 'New List'
        try {
            const savedBoard = await boardService.addNewGroup(boardId, newGroup)
            dispatch(getActionUpdateBoard(savedBoard))
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Cannot add group = ', err)
        }
    }


    async function onAddCard(group, newCard) {
        if (!newCard.title) return
        try {
            const savedBoard = await boardService.addNewCard(boardId, group.id, newCard)
            dispatch(getActionUpdateBoard(savedBoard))
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Cannot add card = ', err)
            throw err
        }
    }

    if (!board) return <Loader />
    return (
        <>
            <Outlet />
            <section className='board-details' style={board.style}>
                <section className={`board-menu ${isOpenMenu ? 'open' : ''}`}>
                    <BoardMenu
                        board={board}
                        isOpenMenu={isOpenMenu}
                        setIsOpenMenu={setIsOpenMenu}
                    />
                </section >

                <section className={`board-content ${isOpenMenu ? 'open' : ''}`}>
                    <BoardHeader
                        isOpenMenu={isOpenMenu}
                        setIsOpenMenu={setIsOpenMenu}
                    />
                    <div className="group-container">
                        <GroupList
                            groups={board.groups}
                            onAddGroup={onAddGroup}
                            onAddCard={onAddCard}
                            onRemoveGroup={onRemoveGroup}
                        />
                    </div>
                </section>
            </section>
        </>
    )
}
