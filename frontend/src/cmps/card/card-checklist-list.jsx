import { CheckListPreview } from "./card-checklist-preview";
import { IoMdCheckboxOutline } from 'react-icons/io';
import { useState } from "react";
import { boardService } from "../../services/board.service.local";

export function CheckListList({ checklists, onSaveCheckList }) {
    const [isAddTodoOpen, setIsAddTodoOpen] = useState(false)
    const [todoTitle, setTodoTitle] = useState('')

    function cancelEditMode() {
        setTodoTitle('')
        setIsAddTodoOpen(!isAddTodoOpen)
    }

    function onSetIsAddTodoOpen() {
        setIsAddTodoOpen(!isAddTodoOpen)
    }

    function onAddTask(checklist) {
        if (todoTitle === '') return
        const todo = boardService.getEmptyTodo()
        todo.title = todoTitle
        checklist.todos.push(todo)
    }

    function handleChange({ target }) {
        let { value, name: filed } = target
        setTodoTitle(prevDesc => value)
    }

    function onSubmitDetails(ev) {
        ev.preventDefault()
        setIsAddTodoOpen(!isAddTodoOpen)
        onAddTask()
    }


    return <>
        {checklists.map(checklist => {
            return <section className="card-checklist" key={checklist.id} >
                <div className="checklist-header">
                    <span className="check-list"><IoMdCheckboxOutline /></span>
                    <h3>{checklist ? checklist.title : 'Checklist'}</h3>
                    <button className="btn">Delete</button>
                </div>
                <CheckListPreview
                    onSaveCheckList={onSaveCheckList}
                    checklists={checklists}
                    checklist={checklist} />

                {!isAddTodoOpen &&
                    <button className="btn btn-add-todo" onClick={onSetIsAddTodoOpen}>
                        Add an item
                    </button>}
                {isAddTodoOpen && (
                    <form onSubmit={onSubmitDetails} className="description-editor">
                        <textarea
                            type="text"
                            id="body"
                            name="body"
                            value={''}
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


