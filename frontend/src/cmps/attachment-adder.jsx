import { useEffect, useRef } from "react"
import { RxCross2 } from "react-icons/rx"
import { uploadService } from "../services/upload.service"


export function AttachmentAdder({ pos, isDropDownOpen, setIsDropDownOpen }) {
    const dropdownRef = useRef(null)

    useEffect(() => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect()
            console.log('rect: ', rect)

            if (rect.width + pos.right >= window.innerWidth) {
                dropdownRef.current.style = `left:${pos.left - rect.width - 10}px`
            } else {
                dropdownRef.current.style = `left:${pos.right + 10}px`
            }
        }
    }, [dropdownRef])



    return (<div className="extras-menu flex" ref={dropdownRef}>
        <span className="title-container">
            <p>
                Attachment
            </p>
            <span className='close-btn hover' onClick={() => setIsDropDownOpen(!isDropDownOpen)}><RxCross2 /></span>
        </span>
        <div className="extras-content-attachment">
            
            <div className="from-computer">
                <div className="upload-fake-btn">
                    Computer

                </div>
                <input onChange={(ev) => uploadService.uploadImg(ev)} title={''} type="file" />
            </div>


            <div className="upload-from-btn" title="Not available right now">
                Google Drive
            </div>
            <div className="upload-from-btn" title="Not available right now">
                Dropbox
            </div>

            <hr />

            <label >
                <h4>Attach a link</h4>
                <input type="text" className='search-input'
                    placeholder='Paste any link here...'
                    autoFocus
                />
            </label>
            <button className="btn btn-add-attach" onClick={(e) => setIsDropDownOpen(!isDropDownOpen)}>
                {/* <input onChange={(ev) => uploadService.uploadImg(ev)} title={''} type="file" /> */}
                Attach
            </button>
        </div>

    </div>)
}