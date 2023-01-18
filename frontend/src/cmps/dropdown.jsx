import { DropdownBoards } from "./dropdown-boards";
import { DropdownCreate } from "./dropdown-create";

export function DropDown({ type }) {

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
                <DropdownBoards />
            )
        case 'create':
            return (
                <DropdownCreate />
            )
    }
}