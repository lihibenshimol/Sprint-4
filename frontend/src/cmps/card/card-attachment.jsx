import { BsArrowUpRight, BsArrowUpShort } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";

export function CheckAttachments({ onChangeAttachment, attachments, onSetType }) {

    function getClr(attach) {
        const clr = attach.bg ? attach.bg : '#091e420a'
        return clr
    }

    function checkImgOrVideo(attach) {
        if (attach.format === 'mp4') {
            return <iframe width="100%" height={"100%"}
                src={attach.imgUrl}
                autoPlay muted />
        } else {
            return <img src={`${attach.imgUrl}`} alt={`${attach.title}`} />
        }
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
                        <div className="attachment" key={a.id} onClick={(e) => onSetType(e, 'attachment-view')}>
                            <div className="attachment-img" style={{ backgroundColor: getClr(a) }}>
                                {checkImgOrVideo(a)}
                            </div>
                            <p>
                                <span className="line">
                                    <span className="title">{a.title}</span>
                                    <span className="arrow"><BsArrowUpShort /></span>
                                </span>
                                <span className="line">
                                    <span className="activity"></span>

                                </span>
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