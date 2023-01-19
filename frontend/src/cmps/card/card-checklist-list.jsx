import { CheckListPreview } from "./card-checklist-preview";
import { IoMdCheckboxOutline } from 'react-icons/io';



export function CheckListList({ checklists }) {

    return <>
        {checklists.map(checklist => {
            return <section className="card-checklist" key={checklist.id} >
                <div className="checklist-header">
                    <span className="check-list"><IoMdCheckboxOutline /></span>
                    <h3>{checklist ? checklist.title : 'Checklist'}</h3>
                    <button>Delete</button>
                </div>
                {<CheckListPreview checklist={checklist} />}
            </section>
        })}
    </>
}


