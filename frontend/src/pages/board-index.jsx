import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BoardHeader } from '../cmps/board-header.jsx'

import { GroupList } from '../cmps/group-list.jsx'
import { boardService } from '../services/board.service.local.js'
import { setCurrBoard } from '../store/board.actions.js'

export function BoardIndex() {
    const { boardId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.currBoard)

    // const groups = useSelector(storeState => storeState.groupModule.groups)

    useEffect(() => {
        loadBoard()
    }, [])


    async function loadBoard() {
        try {
            const board = await boardService.getById(boardId)
            console.log('board loading = ', board)
            setCurrBoard(board)
        } catch (err) {
            console.log('Cannot load board')
            throw err
        }
    }

    // async function onRemoveGroup(groupId) {
    //     try {
    //         await removeGroup(groupId)
    //         showSuccessMsg('Group removed')
    //     } catch (err) {
    //         showErrorMsg('Cannot remove group')
    //     }
    // }

    // async function onAddGroup() {
    //     const group = groupService.getEmptyGroup()
    //     group.vendor = prompt('Vendor?')
    //     try {
    //         const savedGroup = await addGroup(group)
    //         showSuccessMsg(`Group added (id: ${savedGroup._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add group')
    //     }
    // }

    // async function onUpdateGroup(group) {
    //     const price = +prompt('New price?')
    //     const groupToSave = { ...group, price }
    //     try {
    //         const savedGroup = await updateGroup(groupToSave)
    //         showSuccessMsg(`Group updated, new price: ${savedGroup.price}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot update group')
    //     }
    // }

    // function onAddGroupMsg(group) {
    //     console.log(`TODO Adding msg to group`)
    // }

    if (!board) return <h1>loading</h1>
    return (
        <>
        <BoardHeader />
            <div className="group-container">
                 <GroupList groups={board.groups}/>
            </div>
            {/* {board &&<pre>{JSON.stringify(board.groups, null, 2)}</pre>} */}
        </>
    )
}