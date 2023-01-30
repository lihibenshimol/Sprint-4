import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import YouTube from 'react-youtube';
import { CiPlay1, CiPause1 } from 'react-icons/ci'
import { BsFillPlayFill } from 'react-icons/bs'
import { CgPlayPause } from 'react-icons/cg'
import { RxCross2 } from 'react-icons/rx'
import { AiOutlineSound } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { useEffect } from 'react';
import axios from 'axios';
import { utilService } from '../services/util.service';
import { MusicModalDropdown } from './music-modal-dropdown';

export function MusicModal({ setMusicModalOpen, className }) {

    const API_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyCEFG2JDgO7LGdMP5uxbugjkAVhACSf60I&q='

    const [video, setVideo] = useState(null)
    const [videoCurrTime, setVideoCurrTime] = useState(0)
    const [isVideoPlaying, setVideoPlaying] = useState(false)
    const videoIntervalRef = useRef(null)
    const [isFirstClick, setFirstClick] = useState(true)
    const [searchStr, setSearchStr] = useState('')
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [songs, setSongs] = useState([])
    // const [currSong, setCurrSong] = useState({ vidId: 'yvlP4KYW7BE', title: 'V (Cyberpunk 2077 Soundtrack)' })
    const [currSong, setCurrSong] = useState({ vidId: 'eDfcyn5jLII', title: 'Tuna - Hey Babe' })
    const searchInputRef = useRef(null)
    const sliderRef = useRef(null)
    const [volume, setVolume] = useState(100)
    const [videoLength, setVideoLength] = useState(0)
    // const [songImg, setSongImg] = useState('https://i.ytimg.com/vi/yvlP4KYW7BE/hqdefault.jpg')
    const [songImg, setSongImg] = useState('https://i.ytimg.com/vi/eDfcyn5jLII/hqdefault.jpg')

    const handleSearchChangeRef = useRef(utilService.debounce(handleSearchChange))

    useEffect(() => {
        return () => {
            clearInterval(videoIntervalRef.current)
        }
    }, [])

    async function getVids(query) {
        const res = await axios.get(API_URL + query)
        return res.data.items
    }

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0
        }
    }

    function _onReady(event) {
        setVideo(event.target)
        event.target.setVolume(volume)
        setVideoLength(event.target.getDuration())
        videoIntervalRef.current = setInterval(() => {
            setVideoCurrTime(event.target.getCurrentTime())
            if (+event.target.getCurrentTime() >= +event.target.getDuration()) {
                setVideoPlaying(false)
                setFirstClick(true)
            }
        }, 1000)
    }

    function handleChange({ target }) {
        const { value } = target
        setVideoCurrTime(value)
        video.seekTo(value)
        if (isFirstClick) {
            setVideoPlaying(true)
            setFirstClick(false)
        }
    }

    async function handleSearchChange({ target }) {
        const { value } = target
        if (!value) {
            setDropdownOpen(false)
            return
        }
        setSearchStr(value)
        let vids = await getVids(value)
        vids = vids.map(vid => ({ vidId: vid.id.videoId, title: vid.snippet.title, thumbnail: vid.snippet.thumbnails?.high.url || vid.snippet.thumbnails?.default.url }))
        setSongs(vids)
        setDropdownOpen(true)
    }

    function onToggleVideo() {
        if (isVideoPlaying) {
            video.pauseVideo()
            setVideoPlaying(false)
        } else {
            video.playVideo()
            setVideoPlaying(true)
        }
    }

    function onSetSong(song) {
        console.log('song: ', song)

        setCurrSong(song)
        setDropdownOpen(false)
        setVideoCurrTime(0)
        setFirstClick(true)
        setVideoPlaying(false)
        setSongImg(song.thumbnail)
        searchInputRef.current.value = ''
        sliderRef.current.value = 0
        if (videoIntervalRef.current) clearInterval(videoIntervalRef.current)
    }

    function handleModalClick() {
        setDropdownOpen(false)
        searchInputRef.current.value = ''
    }

    function handleBgClick() {
        setDropdownOpen(false)
        setMusicModalOpen(false)
        searchInputRef.current.value = ''
    }

    function handleVolumeChange({ target }) {
        const { value } = target
        if (!video) return
        setVolume(value)
        video.setVolume(value)
    }

    return (
        <div className={className}>
            <section className="music-modal" onClick={handleModalClick}>

                <div className='img-container'><img src={songImg} /></div>
                <YouTube className='hidden' videoId={currSong.vidId} opts={opts} onReady={_onReady} controls />

                <h2>{currSong?.title}</h2>

                <div className="song-bar flex">
                    <button onClick={onToggleVideo} className='play-pause-btn'>{isVideoPlaying ? <CgPlayPause /> : <BsFillPlayFill />}</button>
                    {/* <button onClick={onToggleVideo} className='play-pause-btn'>{isVideoPlaying ? <CiPause1 /> : <CiPlay1 />}</button> */}
                    <span>{utilService.formatTime(+videoCurrTime)}</span>
                    <input ref={sliderRef} defaultValue="0" value={videoCurrTime} step={0.1} max={video?.getDuration()} type="range" onChange={handleChange} />
                    <span>{utilService.formatTime(+videoLength)}</span>
                </div>


                <div className='input-container'>
                    {/* <label for="search" className='search-icon'>
                        < BiSearch />
                    </label> */}
                    <input id='search' ref={searchInputRef} onChange={handleSearchChangeRef.current} type="text" placeholder='Search...' />
                    {isDropdownOpen && <MusicModalDropdown onSetSong={onSetSong} songs={songs} />}
                </div>
                <button className='close-btn' onClick={handleBgClick}>< RxCross2 /> </button>
                {/* <section className='song-controls'> */}
                {/* <div className='volume-container'>
                        <AiOutlineSound />
                        <input defaultValue={12} max="100" step="1" onChange={handleVolumeChange} type="range" />
                    </div> */}
                {/* </section> */}


            </section>
        </div>

    )
}