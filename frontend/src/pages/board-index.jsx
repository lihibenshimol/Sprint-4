import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { GroupList } from '../cmps/group-list.jsx'
import { boardService } from '../services/board.service.local.js'

export function BoardIndex() {
    const [boards, setBoards] = useState()
    // const groups = useSelector(storeState => storeState.groupModule.groups)

    useEffect(() => {
        loadBoards()
    }, [])


    async function loadBoards() {
        try {
            const boards = await boardService.query()
            setBoards(boards)
        } catch (err) {
            console.log('cannot load')
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

    return (<>
        <pre>
            {JSON.stringify(boards, null, 2)}
        </pre>
    </>
        // <GroupList />
    )
}