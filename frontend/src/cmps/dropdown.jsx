import { DropdownBoards } from "./dropdown-boards";

export function DropDown({ type }) {

    switch (type) {
        case 'boards':
            return (
                <DropdownBoards />
            )
    }
}