

export function CardHeader({ card, getGroup, onChangeTitle }) {




    return <div className="card-header">
        <span className="icon fa card-icon"></span>
        <input className="title"
            suppressContentEditableWarning={true}
            contentEditable={true}
            value={'Ola'}
            onChange={onChangeTitle} />

        <div>
            <p className="group-show">in group: {getGroup()}</p>
        </div>
    </div>
}