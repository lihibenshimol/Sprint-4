import { BiWindow } from 'react-icons/bi';
import { TbTag } from 'react-icons/tb';
import { AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { boardService } from '../../services/board.service.local';

export function SideBar({ groupId, card, board, onSaveCheckList, }) {


    async function onAddChecklist() {
        try {
            console.log('checklists: before', card.checklists)
            const newChecklist = boardService.getEmptyChecklist()
            card.checklists.push(newChecklist)
            const newChecklists = card.checklists
            console.log('newChecklists: ', newChecklists)

            onSaveCheckList(newChecklists)
        } catch (err) {
            console.log('Cant add the checklis', err)
        }
    }

    async function onAddChecklist() {
        try {
            console.log('checklists: before', card.checklists)
            const newChecklist = boardService.getEmptyChecklist()
            card.checklists.push(newChecklist)
            const newChecklists = card.checklists
            console.log('newChecklists: ', newChecklists)

            onSaveCheckList(newChecklists)
        } catch (err) {
            console.log('Cant add the checklis', err)
        }
    }


    return (<div className="side-bar">
        <section className="card-utils">
            <h5>Add to card</h5>
            <button className="label-btn">
                <span className=" tag-label"><AiOutlineUser /></span>
                <span>members</span>
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