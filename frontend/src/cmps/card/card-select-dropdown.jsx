import { LabelsSelect } from "../label-selector";
import { MembersSelect } from "../members-selector";
import { CardCoverSelector } from "../card-cover-selector";
import { DateSelector } from "../date-selector";
import { AttachmentAdder } from "../attachment-adder";
import { AttachmentPreview } from "../attachment-preview";

export function CardSelectDropDown({ type, card, pos, attach, isDropDownOpen, setIsDropDownOpen,
    addOrDeleteLabel, addOrDeleteMember, onSaveCover, onSaveAttachment }) {

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
        case 'attachment':
            return <AttachmentAdder
                pos={pos} card={card}
                isDropDownOpen={isDropDownOpen}
                setIsDropDownOpen={setIsDropDownOpen}
                onSaveAttachment={onSaveAttachment}
            />
        case 'attachment-view':
            return <AttachmentPreview
                pos={pos} card={card}
                attach={attach}
                isDropDownOpen={isDropDownOpen}
                setIsDropDownOpen={setIsDropDownOpen}
                onSaveAttachment={onSaveAttachment}
            />
        // case 'delete':
        //     return <DeleteItem/>
        //         pos={pos} card={card}
        //         isDropDownOpen={isDropDownOpen}
        //         setIsDropDownOpen={setIsDropDownOpen}
        //         onSaveAttachment={onSaveAttachment}
        //     />
        default:
            return

    }

}