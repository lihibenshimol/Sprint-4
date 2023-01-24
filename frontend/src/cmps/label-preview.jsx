


export function LabelPreview({ labels, onSetType }) {


    return (

        <div className="details">
            <h5>labels</h5>
            <article className="labels-container">
                {labels.map(label => {
                    return <div className="label hover" style={{ backgroundColor: label.color + '40' }}
                        key={label.id}
                        onClick={(e) => onSetType(e, 'labels')}>
                        <span className=" circle-label" style={{ backgroundColor: label.color }}></span>
                        {label.title}
                    </div>
                })}
                <div className="label fa add hover"
                    onClick={(e) => onSetType(e, 'labels')}></div>
            </article>
        </div>
    )
}