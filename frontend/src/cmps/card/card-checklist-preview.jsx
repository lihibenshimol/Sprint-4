


export function CheckListPreview({ checklist }) {
    console.log('checklist: ', checklist)

    function getDoneTodos() {
        if (!checklist.todos.length) return 0
        const todos = checklist.todos
        console.log('todos: ',todos)
        
        // const isDONE = todos.filter(todo => todo.isDone).length
        const isDONE = todos.reduce((acc, todo) => {
            if (todo.isDone) acc++
            return acc
        }, 0)
        console.log('isDone: ', isDONE)

        return parseFloat((100 * isDONE) / todos.length)
    }




    return (
        <>
            <div className="progress-bar-container">
                <span>{getDoneTodos().toFixed(0)}%</span>
                <div className="progress-bar">
                    <div className="bar" style={{ width: `${getDoneTodos()}%` }}></div>
                </div>
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
