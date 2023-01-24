import { CheckListPreview } from "./card-checklist-preview";
import { IoMdCheckboxOutline } from 'react-icons/io';
import { useState } from "react";
import { boardService } from "../services/board.service"

export function CheckListList({ checklists, onSaveCheckList, }) {
    // isEditAddTodo, setIsEditAddTodo // }) {


    function deleteChecklist(checklistId) {
        console.log('checklistId: ', checklistId)
        const newChecklists = checklists.filter(c => c.id !== checklistId)
        console.log('newChecklists: ', newChecklists)

        onSaveCheckList(newChecklists)
    }


    return <>
        {checklists.map(checklist => {
            return <section className="card-checklist"
                key={checklist.id}>
                <div className="checklist-header">
                    <span className="check-list"><IoMdCheckboxOutline /></span>
                    <h3>{checklist ? checklist.title : 'Checklist'}</h3>
                    <button className="btn" onClick={() => deleteChecklist(checklist.id)}>Delete</button>
                </div>
                <CheckListPreview
                    onSaveCheckList={onSaveCheckList}
                    checklists={checklists}
                    checklist={checklist}
                // isEditAddTodo={isEditAddTodo}
                // setIsEditAddTodo={setIsEditAddTodo}
                />
            </section>
        })}
    </>
}


