import { BiWindow } from 'react-icons/bi';
import { TbTag } from 'react-icons/tb';
import { TiTag } from 'react-icons/ti';
import { AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { boardService } from "../../services/board.service.js"
import { useState } from 'react';
import { utilService } from '../../services/util.service';
import { CardSelectDropDown } from './card-select-dropdown';
import { GrAttachment } from 'react-icons/gr';

export function SideBar({ card, onSaveCheckList, onSetType, }) {

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


    return (
        <div className="side-bar">
            <section className="card-utils">
                <h5>Add to card</h5>

                <button className="label-btn" onClick={(e) => onSetType(e, 'members')}>
                    <span className=" tag-label"><AiOutlineUser /></span>
                    <span>members</span>
                </button>


                <button className="label-btn" onClick={(e) => onSetType(e, 'labels')}>
                    <span className="tag-label labels"><TiTag /></span>
                    <span>labels</span>
                </button>


                <button className="label-btn" onClick={onAddChecklist}>
                    <span className=" tag-label"><IoMdCheckboxOutline /></span>
                    <span>Checklist</span>
                </button>

                {!card.cover &&
                    <button className="label-btn" onClick={(e) => onSetType(e, 'cover')}>
                        <span className="tag-label"><BiWindow /></span>
                        <span>Cover</span>
                    </button>}

                <button className="label-btn" onClick={(e) => onSetType(e, 'date')}>
                    <span className="tag-label"><AiOutlineClockCircle /></span>
                    <span>Dates</span>
                </button>

                <button className="label-btn" onClick={(e) => onSetType(e, 'attachment')}>
                    <span className="tag-label"><GrAttachment  /></span>
                    <span>Attachment</span>
                </button>


            </section>

        </div>
    )
}