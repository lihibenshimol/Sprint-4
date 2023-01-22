import { BiWindow } from 'react-icons/bi';
import { TbTag } from 'react-icons/tb';
import { AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { boardService } from '../../services/board.service.local';
import { useState } from 'react';
import { MembersSelect } from '../members-selector';
import { LabelsSelect } from '../label-selector';
import { CoverSelector } from '../cover-selector';

export function SideBar({ card, onSaveCheckList, onSaveMembers, onSaveLabels, onSaveCover,
    membersSelect, openMembersSelect, labelsSelect, openLabelsSelect,
    openCoverSelect, coverSelect }) {

    async function onAddChecklist() {
        try {
            const newChecklist = boardService.getEmptyChecklist()
            if (!card.checklists) card.checklists = []
            card.checklists.push(newChecklist)
            const newChecklists = card.checklists

            onSaveCheckList(newChecklists)
        } catch (err) {
            console.log('Cant add the checklis', err)
        }
    }

    function addOrDeleteMember(member) {
        if (!card.members) card.members = []
        const memberIdx = card.members.findIndex(m => m._id === member._id)
        if (memberIdx === -1) {
            member.isChecked = true
            card.members.push(member)
        }
        else {
            member.isChecked = false
            card.members.splice(memberIdx, 1)
        }

        const newMembers = card.members
        onSaveMembers(newMembers)
    }

    function addOrDeleteLabel(label) {
        if (!card.labels) card.labels = []
        const labelIdx = card.labels.findIndex(l => l.id === label.id)
        if (labelIdx === -1) {
            label.isChecked = true
            card.labels.push(label)
        }
        else {
            label.isChecked = false
            card.labels.splice(labelIdx, 1)
        }

        const newLabels = card.labels
        onSaveLabels(newLabels)
    }




    return (<div className="side-bar">
        <section className="card-utils">
            <h5>Add to card</h5>

            <button className="label-btn" onClick={() => openMembersSelect(!membersSelect)}>
                <span className=" tag-label"><AiOutlineUser /></span>
                <span>members</span>
            </button>

            {membersSelect &&
                <MembersSelect
                    addOrDeleteMember={addOrDeleteMember}
                    membersSelect={membersSelect}
                    openMembersSelect={openMembersSelect}
                />}

            {labelsSelect &&
                <LabelsSelect
                    addOrDeleteLabel={addOrDeleteLabel}
                    labelsSelect={labelsSelect}
                    openLabelsSelect={openLabelsSelect}
                />}


            {coverSelect &&
                <CoverSelector
                    onSaveCover={onSaveCover}
                    openCoverSelect={openCoverSelect}
                    coverSelect={coverSelect}
                />}

            <button className="label-btn" onClick={() => openLabelsSelect(!labelsSelect)}>
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


            {!card.cover &&
                <button className="label-btn" onClick={() => openCoverSelect(!coverSelect)}>
                    <span className="tag-label"><BiWindow /></span>
                    <span>Cover</span>
                </button>}

        </section>

    </div>
    )
}