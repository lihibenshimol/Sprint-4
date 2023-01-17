import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { GroupList } from '../cmps/group-list.jsx'

export function BoardIndex() {

    // const groups = useSelector(storeState => storeState.groupModule.groups)

    // useEffect(() => {
    //     loadGroups()
    // }, [])

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
        <GroupList />
    )
}