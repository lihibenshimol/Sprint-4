import { CheckListPreview } from "./card-checklist-preview";
import { IoMdCheckboxOutline } from 'react-icons/io';
import { useState } from "react";
import { boardService } from "../../services/board.service.local";

export function CheckListList({ checklists, onSaveCheckList, isEditAddTodo, setIsEditAddTodo }) {
    // const [isEditAddTodo, setIsEditAddTodo] = useState(false)
    const [todoTitle, setTodoTitle] = useState('')


    function cancelEditMode() {
        setTodoTitle('')
        setIsEditAddTodo(!isEditAddTodo)
    }

    function onAddTask(checklist) {
        if (todoTitle === '') return
        const todo = boardService.getEmptyTodo()
        todo.title = todoTitle
        checklist.todos.push(todo)
        const newChecklists = checklists
            .map(c => (c.id === checklist.id) ? checklist : c)

        onSaveCheckList(newChecklists)
    }

    function handleChange({ target }) {
        let { value, name: filed } = target
        console.log('filed: ', filed)

        setTodoTitle(prevDesc => value)
    }

    function onSubmitDetails(ev, checklist) {
        ev.preventDefault()
        onAddTask(checklist)
        cancelEditMode()
    }


    return <>
        {checklists.map(checklist => {
            return <section className="card-checklist"
                key={checklist.id}>
                <div className="checklist-header">
                    <span className="check-list"><IoMdCheckboxOutline /></span>
                    <h3>{checklist ? checklist.title : 'Checklist'}</h3>
                    <button className="btn">Delete</button>
                </div>
                <CheckListPreview
                    onSaveCheckList={onSaveCheckList}
                    checklists={checklists}
                    checklist={checklist} />


                {!isEditAddTodo &&
                    <button className="btn btn-add-todo" onClick={() => setIsEditAddTodo(!isEditAddTodo)}>
                        Add an item
                    </button>}
                {isEditAddTodo && (
                    <form onSubmit={(e) => onSubmitDetails(e, checklist)}
                        onClick={e => e.stopPropagation()}
                        className="description-editor">
                        <textarea
                            autoFocus
                            type="text"
                            id="description"
                            name="description"
                            value={todoTitle}
                            onChange={handleChange}
                            placeholder="Add an item"
                        >
                        </textarea>
                        <button className="save-btn">Add</button>
                        <button type="button" className="cancel-btn" onClick={cancelEditMode}>Cancel</button>
                    </form>
                )}
            </section>
        })}
    </>
}


