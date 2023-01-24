import Moment from 'react-moment';


export function AttachmentPreview({ attach, setIsDropDownOpen, isDropDownOpen }) {

    console.log('attach: ', attach)

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
        <section className="window full">
            <section className="attachment-content" onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                <section className='header'></section>

                <section className='main'>
                    {checkImgOrVideo(attach)}
                </section>

                <footer>
                    <h2>{attach.title}</h2>
                    <p> Added <Moment interval={60000} fromNow>{attach.createAt}</Moment></p>
                    <p>
                        <span>remove</span>
                        <span>add</span>
                        <span>view</span>
                    </p>
                </footer>
            </section>
        </section>
    )
}