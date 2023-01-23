import { DropdownBackground } from "./dropdown-background";
import { DropdownBoards } from "./dropdown-boards";
import { DropdownCreate } from "./dropdown-create";
import { DropdownCreateList } from "./dropdown-create-list";
import { DropdownRecent } from "./dropdown-recent";
import { DropdownStarred } from "./dropdown-starred";
import { DropdownUser } from "./dropdown-user";

export function DropDown({ type, setAddingBoard, setDropDown, setBgMenuOpen, setBoardBackground, colors, isSelectedColor }) {

    switch (type) {
        case 'boards':
            return (
                <DropdownBoards setDropDown={setDropDown} />
            )
        case 'recent':
            return (
                <DropdownRecent setDropDown={setDropDown} />
            )
        case 'starred':
            return (
                <DropdownStarred setDropDown={setDropDown} />
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
        case 'background':
            return (
                <DropdownBackground isSelectedColor={isSelectedColor} colors={colors} setBoardBackground={setBoardBackground} setBgMenuOpen={setBgMenuOpen} />
            )
        case 'user':
            return (
                <DropdownUser setDropDown={setDropDown} />
            )
    }
}