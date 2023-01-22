import { DropdownBackground } from "./dropdown-background";
import { DropdownBoards } from "./dropdown-boards";
import { DropdownCreate } from "./dropdown-create";
import { DropdownCreateList } from "./dropdown-create-list";
import { DropdownStarred } from "./dropdown-starred";

export function DropDown({ type, setAddingBoard, setDropDown, setBgMenuOpen, setBoardBackground, colors, isSelectedColor }) {

    switch (type) {
        case 'boards':
            return (
                <DropdownBoards setDropDown={setDropDown} />
            )
        case 'recent':
            return (
                <DropdownBoards />
            )
        case 'starred':
            return (
                <DropdownStarred setDropDown={setDropDown}/>
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
    }
}