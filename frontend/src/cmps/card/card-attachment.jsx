import { GrAttachment } from "react-icons/gr";
import { FastAverageColor } from 'fast-average-color'
import { useEffect } from "react";
import { useState } from "react";


export function CheckAttachments({ onChangeAttachment, attachments, onSetType }) {
    console.log('attachments: ', attachments)


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
                            <div className="attachment-img" >
                                <img src={`${a.imgUrl}`} alt={`${a.title}`} />
                            </div>
                            <p>
                                <span className="title"> {a.title}</span>
                            </p>

                        </div>
                    )
                })}



                <button className="btn btn-add-attach" onClick={(e) => onSetType(e, 'attachment')}>
                    {/* <input onChange={(ev) => uploadService.uploadImg(ev)} title={''} type="file" /> */}
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