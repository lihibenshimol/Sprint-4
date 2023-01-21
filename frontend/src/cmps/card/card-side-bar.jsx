import { BiWindow } from 'react-icons/bi';
import { TbTag } from 'react-icons/tb';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { boardService } from '../../services/board.service.local';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { MembersSelect } from '../members-selector';

export function SideBar({ groupId, card, onSaveCheckList, onSaveMembers }) {
    const [isAddMembersEdit, setIsAddMembersEdit] = useState(false)


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

    function onAddMember(member) {
        // const newMembers = []
        card.members.push(member)
        const newMembers = card.members

        onSaveMembers(newMembers)
    }



    return (<div className="side-bar">
        <section className="card-utils">
            <h5>Add to card</h5>

            <button className="label-btn" onClick={() => setIsAddMembersEdit(!isAddMembersEdit)}>
                <span className=" tag-label"><AiOutlineUser /></span>
                <span>members</span>

                {isAddMembersEdit && <div className="extras-menu flex">
                    <span className="title-container">
                        <p>
                            Members
                        </p>
                        <a className='close-btn'><RxCross2 /></a>
                    </span>
                    <MembersSelect />
                </div>}
            </button>


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