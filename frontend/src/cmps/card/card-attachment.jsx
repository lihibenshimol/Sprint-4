import { GrAttachment } from "react-icons/gr";

export function CheckAttachments({ onChangeAttachment, attachments, onSetType }) {

    function getClr(attach) {
        const clr = attach.bg ? attach.bg : '#091e420a'
        return clr
    }

    return (
        <section className="card-attachment">
            <div className="section-header">
                <span><GrAttachment /></span>
                <h3>Attachments</h3>
            </div>
            <div className="attachments-container">
                {attachments.map(a => {

                    return (
                        <div className="attachment" key={a.id} >
                            <div className="attachment-img" style={{ backgroundColor: getClr(a) }}>
                                <img src={`${a.imgUrl}`} alt={`${a.title}`} />
                            </div>
                            <p>
                                <span className="title"> {a.title}</span>
                            </p>
                        </div>
                    )
                })}

                <button className="btn btn-add-attach" onClick={(e) => onSetType(e, 'attachment')}>
                    Add an item
                </button>
            </div>
        </section >)
}




// attachment = {
//     img: 'www.imgUrl.com',
//     updaloadAt: 1365466464,
//     title,
// }