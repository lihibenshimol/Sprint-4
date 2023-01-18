import { boardService } from "../services/board.service.local";
import { setCurrBoard, updateBoard } from "../store/board.actions";
import { GroupPreview } from "./group-preview";
import { useSelector } from "react-redux"
import { useEffect } from "react";



export function GroupList() {
    const board = useSelector(storeState => storeState.boardModule.currBoard)

    // useEffect(() => {

    // }, [board])

    async function addCard(group, card) {
        try {
            await boardService.addNewCard(group, card)
            console.log('board = ', board)
            // setCurrBoard(board)
            updateBoard(board)
        } catch (err) {
            console.log('cannot add card = ', err)
            throw err
        }
    }

    return (
        <>
            <div className="group-list flex">
                {board.groups.map(group => <section className="group-wrapper flex" key={group.id}>
                    <GroupPreview group={group} addCard={addCard} />
                </section>)}

            </div>
        </>
    )
}