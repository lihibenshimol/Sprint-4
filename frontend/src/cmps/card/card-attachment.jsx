import { useState } from "react";
import { BsArrowUpShort } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import Moment from 'react-moment';

export function CheckAttachments({ onChangeAttachment,
    setAttachToView, attachments, onSetType }) {
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


    function onClickAttachment(e, attach) {
        onSetType(e, 'attachment-view')
        setAttachToView(prevAttach => attach)
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
                        <div className="attachment" key={a.id} onClick={(e) => onClickAttachment(e, a)}>
                            <div className="attachment-img" style={{ backgroundColor: getClr(a) }}>
                                {checkImgOrVideo(a)}
                            </div>
                            <p>
                                <span className="line">
                                    <span className="title">{a.title}</span>
                                    <span className="arrow"><BsArrowUpShort /></span>
                                </span>
                                <span className="line">
                                    <span className="activity">
                                        Added <Moment interval={10000} fromNow>{a.createAt}</Moment>
                                    </span>
                                    <span> • </span>
                                    <span className="action">Delete</span>
                                    <span> • </span>
                                    <span className="action">Comment</span>
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