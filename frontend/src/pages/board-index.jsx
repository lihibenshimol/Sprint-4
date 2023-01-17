import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { GroupList } from '../cmps/group-list.jsx'
import { boardService } from '../services/board.service.local.js'

export function BoardIndex() {
    const { boardId } = useParams()
    const [board, setBoard] = useState()
    // const groups = useSelector(storeState => storeState.groupModule.groups)

    useEffect(() => {
        loadBoard()
    }, [])


    async function loadBoard() {
        console.log('looping');
        try {
            const board = await boardService.getById(boardId)
            setBoard(board)
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

    return (
        <>
            <div className="group-container">
                {board && <GroupList groups={board.groups} board={board}/>}
            </div>
            {/* {board &&<pre>{JSON.stringify(board.groups, null, 2)}</pre>} */}
        </>
    )
}