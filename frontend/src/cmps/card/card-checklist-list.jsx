import { CheckListPreview } from "./card-checklist-preview";
import { IoMdCheckboxOutline } from 'react-icons/io';



export function CheckListList({ checklists }) {
    console.log('checklists: ', checklists)


    return <>
        {checklists.map(checklist => {
            console.log('checklist: ', checklist)

            return <section className="card-checklist" key={checklist.id} >
                <div className="section-header">
                    <span className="check-list"><IoMdCheckboxOutline /></span>
                    <h3>{checklist ? checklist.title : 'Checklist'}</h3>
                    <button >Edit</button>
                </div>
                {<CheckListPreview checklist={checklist} />}
            </section>
        })}
    </>
}







//      <>
//         <section className="card-checklist" >
//             <div className="section-header">
//                 <span className="check-list"><IoMdCheckboxOutline /></span>
//                 <h3>{card.checklist ? card.checklist.title : 'Checklist'}</h3>
//                 <button >Edit</button>
//             </div>
//             <section>



//             </>

// }