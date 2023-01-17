import { boardService } from "../services/board.service.local";
import { GroupPreview } from "./group-preview";


export function GroupList({ groups, board }) {

    async function addCard(group, card) {
       const newCard = await boardService.addNewCard(group, card, board)
        console.log('newCard = ',newCard )
    }

    return (
        <>
            <div className="group-list flex">
                {groups.map(group => <section className="group-wrapper flex" key={group.id}>
                    <GroupPreview group={group} addCard={addCard} />
                </section>)}

            </div>
        </>
    )
}