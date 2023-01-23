import { BoardAdd } from "./board-add";
import { BoardPreview } from "./board-preview";

export function BoardList({ addNew = false, boards, type }) {

    return (

        <section className="board-list">
            {boards[0] && boards.map(board => (
                <BoardPreview type={type} board={board} key={board._id} />
            ))}
            {addNew && <BoardAdd />}

        </section>

    )
}