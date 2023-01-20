import { useEffect, useState } from "react"
import { boardService } from "../../services/board.service.local"



export function CheckListPreview({ checklist, onSaveCheckList, checklists }) {
    const [checklistsState, setChecklistsToPreview] = useState(checklist)

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
        console.log('checklistsState: ', checklistsState)

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
                        <p className={`${t.isDone ? 'todo-done' : ''}`}>{t.title}</p>
                        <div className="todo-utils">
                            <button onClick={() => onRemoveTodo(t.id)}>Trash</button>
                        </div>
                    </div>
                </div>)
            })}
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
