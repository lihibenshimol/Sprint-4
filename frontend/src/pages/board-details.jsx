import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Outlet, useNavigate} from 'react-router-dom'
import { BoardHeader } from '../cmps/board-header.jsx'
import { GroupList } from '../cmps/group-list.jsx'
import { Loader } from '../cmps/loader.jsx'
import { boardService } from '../services/board.service.local.js'
import { setCurrBoard, updateBoard } from '../store/board.actions.js'

export function BoardDetails() {
    const { boardId } = useParams()
    const navigate = useNavigate()
    const board = useSelector(storeState => storeState.boardModule.currBoard)


    useEffect(() => {
        loadBoard()
       
    }, [boardId])

    async function loadBoard() {
        try {
            const board = await boardService.getById(boardId)
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
            updateBoard(board)

        } catch (err) {
            console.log('Cannot remove group = ', err)
        }
    }

    async function onAddGroup(newGroup) {
        if (!newGroup.title) newGroup.title = 'New List'
        try {
            await boardService.addNewItem(board, newGroup, 'groups')
            updateBoard(board)
            // newGroup.title = ''
        } catch (err) {
            console.log('Cannot add group = ', err)
            throw err
        }
    }

    async function onAddCard(group ,newCard) {
        if (!newCard.title) return
        try {
            await boardService.addNewItem(group, newCard, 'cards')
            updateBoard(board)
        } catch (err) {
            console.log('Cannot add group = ', err)
            throw err
        }
    }


    if (!board) return <Loader />
    return (
        <>
        <Outlet />
        
            <section className='board-details main-container' style={board.style}>
                <BoardHeader />
                <div className="group-container">
                    <GroupList 
                    groups={board.groups}
                    onAddGroup={onAddGroup}
                    onAddCard={onAddCard}
                    onRemoveGroup={onRemoveGroup}
                    />
                </div>
            </section>
          
        </>
    )
}