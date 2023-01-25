import { useEffect, useRef } from "react"
import { RxCross2 } from "react-icons/rx"
import { boardService } from "../services/board.service.js"
import { uploadService } from "../services/upload.service"
import { FastAverageColor } from 'fast-average-color'
import { useState } from "react"


export function AttachmentAdder({ card, pos, isDropDownOpen, setIsDropDownOpen,
    onSaveAttachment }) {
    const [isAttachViewer, setIsAttachViewer] = useState(false)
    const [urlToSave, setUrlToSave] = useState('')
    const dropdownRef = useRef(null)
    const fac = new FastAverageColor();

    useEffect(() => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect()
            if (rect.width + pos.right >= window.innerWidth) {
                dropdownRef.current.style = `left:${pos.left - rect.width - 10}px`
            } else {
                dropdownRef.current.style = `left:${pos.right + 10}px`
            }
        }
    }, [dropdownRef])


    async function onUploadImg(ev) {
        if (!card.attachments) card.attachments = []
        try {
            let fileToSave = boardService.getEmptyAttachment()
            const file = await uploadService.uploadImg(ev)
            console.log('file: ', file)

            fileToSave.title = file.original_filename
            fileToSave.imgUrl = file.url
            fac.getColorAsync(file.url)
                .then(color => {
                    fileToSave.bg = color.hex
                    card.attachments.push(fileToSave)
                    onSaveAttachment(card.attachments)
                })
                .catch(e => {
                    console.log(e)
                })

        } catch (err) {
            console.log('Cant Upload the file', err)

        }
    }

    async function onGetImg() {
        if (urlToSave === '') return
        if (!card.attachments) card.attachments = []
        try {
            let fileToSave = boardService.getEmptyAttachment()
            fileToSave.imgUrl = urlToSave
            fileToSave.title = urlToSave.substring(8, 100)
            fac.getColorAsync(urlToSave)
                .then(color => {
                    fileToSave.bg = color.hex
                    card.attachments.push(fileToSave)
                    onSaveAttachment(card.attachments)
                    setIsDropDownOpen(!isDropDownOpen)
                })
                .catch(e => {
                    console.log(e)
                })

        } catch (err) {
            console.log('Cant Upload the file', err)
        }
    }

    function handleChange({ target }) {
        const { value } = target
        console.log('value: ', value)
        setUrlToSave(prevUrl => value)
    }


    return (
    <div className="extras-menu flex" ref={dropdownRef}>
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
                <input onChange={(ev) => onUploadImg(ev)} title={''} type="file" />
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
                    value={urlToSave}
                    onChange={handleChange}
                    autoFocus
                />
            </label>
            <button className="btn btn-add-attach" onClick={onGetImg}>
                Attach
            </button>
        </div>

    </div>
    )
}