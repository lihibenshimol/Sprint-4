


export function CheckListPreview({ checklist }) {
    console.log('checklist: ', checklist)

    function getDoneTodos() {
        if (!checklist.todos.length) return 0
        const todos = checklist.todos
        const isDone = todos.reduce((acc, todo) => {
            if (todo.isDone) acc++
            return acc
        }, 0)

        return parseFloat((100 * isDone) / todos.length)
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
            {checklist.todos.map(t => {
                console.log('t: ', t)

                return (<div className="todo" key={t.id}>
                    <span className={`${t.isDone ? "checked" : ''}`}></span>
                    <div className="todo-title">
                        <p>{t.title}</p>
                        <div>utils</div>
                    </div>
                </div>)

            })

            }
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
