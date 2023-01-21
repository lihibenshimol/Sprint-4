import { BiWindow } from 'react-icons/bi';
import { TbTag } from 'react-icons/tb';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { boardService } from '../../services/board.service.local';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { MembersSelect } from '../members-selector';

export function SideBar({ card, onSaveCheckList, onSaveMembers }) {
    const [isAddMembersEdit, setIsAddMembersEdit] = useState(false)

    console.log('card: ', card)

    async function onAddChecklist() {
        try {
            const newChecklist = boardService.getEmptyChecklist()
            card.checklists.push(newChecklist)
            const newChecklists = card.checklists

            onSaveCheckList(newChecklists)
        } catch (err) {
            console.log('Cant add the checklis', err)
        }
    }

    function addMember(member) {
        console.log('add')
        if (!card.members) card.members = []
        if (card.members.includes(member)) return console.log('Include')
        card.members.push(member)
        const newMembers = card.members
        onSaveMembers(newMembers)
    }

    function removeMember(member) {
        console.log('remove')
        if (!card.members) return
        const memberIdx = card.members.findIndex(m => m._id === member._id)
        if (memberIdx === -1) return
        card.members.splice(memberIdx, 1)

        const newMembers = card.members
        onSaveMembers(newMembers)

    }


    return (<div className="side-bar">
        <section className="card-utils">
            <h5>Add to card</h5>

            <button className="label-btn" onClick={() => setIsAddMembersEdit(!isAddMembersEdit)}>
                <span className=" tag-label"><AiOutlineUser /></span>
                <span>members</span>
            </button>

            {isAddMembersEdit &&
                <div className="extras-menu flex">
                    <span className="title-container">
                        <p>
                            Members
                        </p>
                        <a className='close-btn'><RxCross2 /></a>
                    </span>
                    <MembersSelect
                        addMember={addMember}
                        removeMember={removeMember} />
                </div>}


            <button className="label-btn">
                <span className="tag-label labels"><TbTag /></span>
                <span>labels</span>
            </button>


            <button className="label-btn" onClick={onAddChecklist}>
                <span className=" tag-label"><IoMdCheckboxOutline /></span>
                <span>Checklist</span>
            </button>


            <button className="label-btn">
                <span className="tag-label"><AiOutlineClockCircle /></span>
                <span>Date</span>
            </button>


            <button className="label-btn">
                <span className="tag-label"><BiWindow /></span>
                <span>Cover</span>
            </button>

        </section>

    </div>
    )
}