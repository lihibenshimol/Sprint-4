import { CardPreview } from "./card-preview";

export function GroupPreview({ group }) {
    return (
        <>
        <div className="group-content">
            <div className="group-header" contentEditable>
            {group.title}
            </div>
            <CardPreview cards={group.cards} />
        </div>
        </>
    )
}