import { LabelsSelect } from "../label-selector";
import { MembersSelect } from "../members-selector";
import { CardCoverSelector } from "../card-cover-selector";
import { DateSelector } from "../date-selector";

export function CardSelectDropDown({ type, card, pos, isDropDownOpen, setIsDropDownOpen,
    addOrDeleteLabel, addOrDeleteMember, onSaveCover, }) {
        console.log('pos = ', pos)

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
        case 'date':
            return <DateSelector
                pos={pos}
                isDropDownOpen={isDropDownOpen}
                setIsDropDownOpen={setIsDropDownOpen}

            />
        default:
            return

    }

}