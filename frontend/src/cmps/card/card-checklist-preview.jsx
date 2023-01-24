import { useEffect, useState } from "react"
import {boardService} from "../../services/board.service.js"
import { TfiTrash } from "react-icons/tfi"


export function CheckListPreview({ checklist, onSaveCheckList, checklists,
    // isEditAddTodo, setIsEditAddTodo,
}) {
    const [checklistsState, setChecklistsToPreview] = useState(checklist)
    const [isEditTodoTitle, setIsEditTodoTitle] = useState(false)
    const [todoTitle, setTodoTitle] = useState('')
    const [isEditAddTodo, setIsEditAddTodo] = useState(false)
    // const [title, setTitle] = useEffect(true)



    function getDoneTodos() {
        if (!checklist.todos.length) return 0
        const todos = checklistsState.todos
        const isDone = todos.reduce((acc, todo) => {
            if (todo.isDone) acc++
            return acc
        }, 0)

        return parseFloat((100 * isDone) / todos.length)
    }

    function onIsTodoDone(todo) {
        const newTodo = { ...todo, isDone: !todo.isDone }
        const todos = checklistsState.todos
            .map(todo => todo.id === newTodo.id ? newTodo : todo)
        const newCheckList = { ...checklist, todos }
        const newCheckLists = checklists.map(checklist => {
            return checklist.id === newCheckList.id ? newCheckList : checklist
        })

        setChecklistsToPreview(newCheckList)
        onSaveCheckList(newCheckLists)
    }

    function onRemoveTodo(todoId) {
        const todos = checklistsState.todos
            .filter(todo => todo.id !== todoId)
        const newCheckList = { ...checklist, todos }
        const newCheckLists = checklists.map(checklist => {
            return checklist.id === newCheckList.id ? newCheckList : checklist
        })

        setChecklistsToPreview(newCheckList)
        onSaveCheckList(newCheckLists)
    }


    //--------------------------------


    function onAddTodo(checklist) {
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
        onAddTodo(checklist)
        cancelEditMode()
    }

    function cancelEditMode() {
        setTodoTitle('')
        setIsEditAddTodo(!isEditAddTodo)
    }

    return (<>
        <div className="progress-bar-container">
            <span>{getDoneTodos().toFixed(0)}%</span>
            <div className="progress-bar">
                <div className="bar" style={{
                    width: `${(getDoneTodos())}%`,
                    backgroundColor: `${getDoneTodos() === 100 ? '#61bd4f' : '#5ba4cf'}`
                }}></div>
            </div>
        </div>

        <div className="todo-container">
            {checklistsState.todos.map(t => {
                return (<div className="todo" key={t.id}>
                    <span className={`${t.isDone ? "checked" : ''}`} onClick={() => onIsTodoDone(t)}></span>
                    <div className="todo-title" >


                        {!isEditTodoTitle &&
                            <p className={`${t.isDone ? 'todo-done' : ''}`}
                            // onClick={onIsEditTodoTitle}
                            >
                                {t.title}</p>}

                        {
                            // isEditTodoTitle && (
                            //     <form
                            //         //  onSubmit={(e) => onSubmitDetails(e, checklist)}
                            //         // onClick={e => e.stopPropagation()}
                            //         className="description-editor">
                            //         <textarea
                            //             autoFocus
                            //             type="text"
                            //             id="description"
                            //             name="description"
                            //             value={t.title}
                            //             // onChange={handleChange}
                            //             placeholder="Add an item"
                            //         >
                            //         </textarea>
                            //         <button className="save-btn">Add</button>
                            //         {/* <button type="button" className="cancel-btn" onClick={cancelEditMode}>Cancel</button> */}
                            //     </form>)
                        }


                        <div className="todo-utils">
                            <button onClick={() => onRemoveTodo(t.id)}><TfiTrash /></button>
                        </div>
                    </div>
                </div>)
            })}
        </div>

        <div className="add-todo-container">
            {!isEditAddTodo &&
                <button className="btn btn-add-todo"
                    onClick={() => setIsEditAddTodo(!isEditAddTodo)}>
                    Add an item
                </button>}

            {isEditAddTodo && (
                <form onSubmit={(e) => onSubmitDetails(e, checklist)}
                    onClick={e => e.stopPropagation()}
                    className="add-todo-editor">
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
                </form>)}
        </div>
    </>)
}


// checklists:  [
    //         {
    //             id: 'YEhmF',
    //             title: 'Checklist',
    //             todos: [
    //                 {
    //                     id: '212jX',
    //                     title: 'To Do 1',
    //                     isDone: false
    //                 }
    //             ]
    //         }
