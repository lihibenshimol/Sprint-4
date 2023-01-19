import { BoardList } from "../cmps/board-list";

export function BoardIndex() {
    return (
        <section className="board-index main-layout">
            <section className="your-boards">
                <h2>Your boards</h2>
                <BoardList addNew={true} />
            </section>
        </section>
    )
}