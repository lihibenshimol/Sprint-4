import { BiWindow } from 'react-icons/bi';
import { TbTag } from 'react-icons/tb';
import { AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai';
import { IoMdCheckboxOutline } from 'react-icons/io';


export function SideBar() {

    return (<div className="side-bar">
        <section className="card-utils">
            <h5>Add to card</h5>
            <button className="label-btn">
                <span className=" tag-label"><AiOutlineUser /></span>
                <span>members</span>
            </button>
            <button className="label-btn">
                <span className="tag-label"><TbTag /></span>
                <span>labels</span>
            </button>
            <button className="label-btn">
                <span className=" tag-label"><IoMdCheckboxOutline /></span>
                <span>Checklist</span>
            </button>
            <button className="label-btn">
                <span className="tag-label"><AiOutlineClockCircle /></span>
                <span>Date</span>
            </button>
            <button className="label-btn">
                <span className="fa tag-label"><BiWindow /></span>
                <span>Cover</span>
            </button>
        </section>
    </div>
    )

}