import { CardList } from "./card-list";
import { CardPreview } from "./card-preview";

export function GroupPreview({ group, addCard }) {
    return (
        <>
        <div className="group-content">
            <div className="group-header" >
            {group.title}
            </div>

            <CardList group={group} addCard={addCard} cards={group.cards} />
        </div>
        </>
    )
}