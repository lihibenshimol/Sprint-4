export function MusicModalDropdown({songs, onSetSong}){
    return (
        <section className="music-modal-dropdown">
            <ul className="clean-list">
                {songs?.map(song => (
                    <li onClick={() => onSetSong(song)}>{song.title}</li>
                ))}
            </ul>
        </section>
    )
}