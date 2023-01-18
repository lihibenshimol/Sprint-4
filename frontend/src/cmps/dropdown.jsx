import { DropdownBoards } from "./dropdown-boards";
import { DropdownCreate } from "./dropdown-create";
import { DropdownCreateList } from "./dropdown-create-list";

export function DropDown({ type, setAddingBoard, setDropDown }) {

    switch (type) {
        case 'boards':
            return (
                <DropdownBoards />
            )
        case 'recent':
            return (
                <DropdownBoards />
            )
        case 'starred':
            return (
                <DropdownBoards />
            )
        case 'templates':
            return (
                <DropdownBoards />
            )
        case 'create-list':
            return (
                <DropdownCreateList setDropDown={setDropDown} />
            )
        case 'create':
            return (
                <DropdownCreate setAddingBoard={setAddingBoard} />
            )
    }
}