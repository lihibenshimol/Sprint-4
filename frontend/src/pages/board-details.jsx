import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Outlet, } from 'react-router-dom'
import { BoardHeader } from '../cmps/board-header.jsx'
import { BoardMenu } from '../cmps/board-menu.jsx'
import { GroupList } from '../cmps/group-list.jsx'
import { Loader } from '../cmps/loader.jsx'
import { boardService } from "../services/board.service"
import { socketService, SOCKET_EMIT_BOARD_UPDATED, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_BOARD_UPDATED } from '../services/socket.service.js'
import { setCurrBoard, updateBoard } from '../store/board.actions.js'

export function BoardDetails() {
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    const { boardId } = useParams()
    let board = useSelector(storeState => storeState.boardModule.currBoard)
    // board = JSON.parse(JSON.stringify(board))
    // console.log('board = ', board)


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
            throw err
        }
    }

    async function onRemoveGroup(groupId) {
        try {
            const idx = board.groups.findIndex(g => g.id === groupId)
            board.groups.splice(idx, 1)
            const savedBoard = await updateBoard(board)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Cannot remove group = ', err)
        }
    }

    async function onAddGroup(newGroup) {
        if (!newGroup.title) newGroup.title = 'New List'
        try {
            await boardService.addNewItem(board, newGroup, 'groups')
            const savedBoard = await updateBoard(board)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
            // newGroup.title = ''
        } catch (err) {
            console.log('Cannot add group = ', err)
            throw err
        }
    }

    async function onAddCard(group, newCard) {
        if (!newCard.title) return
        try {
            await boardService.addNewItem(group, newCard, 'cards')
            const savedBoard = await updateBoard(board)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Cannot add group = ', err)
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
                        isOpenMenu={isOpenMenu}
                        setIsOpenMenu={setIsOpenMenu}
                    />
                </section >

                <section className={isOpenMenu ? 'board-content-open' : 'board-content'}>
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