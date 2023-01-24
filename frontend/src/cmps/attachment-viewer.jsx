

export function AttachmentViewer(attach, isAttachViewer, setIsAttachViewer) {
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
            <div className="black-bg full" onClick={() => setIsAttachViewer(!isAttachViewer)}></div>
            <section className="content">
                <header></header>


                <main>
                    <img src="https://images.unsplash.com/photo-1674560435460-c266654fdc56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
                    {/* {checkImgOrVideo(attach)} */}
                </main>


                <footer>
                    <h2>{attach.title}</h2>
                    <p>Create at</p>
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