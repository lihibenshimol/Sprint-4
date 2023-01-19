import { BoardList } from "../cmps/board-list";

export function Boards() {
    return (
        <section className="boards main-layout">
            <section className="your-boards">
                <h2>Your boards</h2>
                <BoardList addNew={true} />
            </section>
        </section>
    )
}