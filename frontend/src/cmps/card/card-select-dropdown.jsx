import { LabelsSelect } from "../label-selector";
import { MembersSelect } from "../members-selector";
import { CardCoverSelector } from "../card-cover-selector";

export function CardSelectDropDown({ type, card, pos, isDropDownOpen, setIsDropDownOpen,
    addOrDeleteLabel, addOrDeleteMember, onSaveCover, }) {


    switch (type) {
        case 'labels':
            return <LabelsSelect
                card={card} pos={pos}
                isDropDownOpen={isDropDownOpen}
                setIsDropDownOpen={setIsDropDownOpen}
                addOrDeleteLabel={addOrDeleteLabel} />
        case 'members':
            return <MembersSelect
                card={card} pos={pos}
                isDropDownOpen={isDropDownOpen}
                setIsDropDownOpen={setIsDropDownOpen}
                addOrDeleteMember={addOrDeleteMember}
            />
        case 'cover':
            return <CardCoverSelector
                pos={pos}
                isDropDownOpen={isDropDownOpen}
                setIsDropDownOpen={setIsDropDownOpen}
                onSaveCover={onSaveCover} />
        default:
            return

    }

}