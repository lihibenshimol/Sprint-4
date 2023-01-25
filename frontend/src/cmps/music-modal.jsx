import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import YouTube from 'react-youtube';
import { CiPlay1 } from 'react-icons/ci'
import { CiPause1 } from 'react-icons/ci'
import { useEffect } from 'react';

export function MusicModal({ setMusicModalOpen, className }) {

    const [video, setVideo] = useState(null)
    const [videoCurrTime, setVideoCurrTime] = useState(0)
    const [isVideoPlaying, setVideoPlaying] = useState(false)
    const videoIntervalRef = useRef(null)
    const [isFirstClick, setFirstClick] = useState(true)

    useEffect(() => {
        return () => {
            clearInterval(videoIntervalRef.current)
        }
    }, [])


    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    }


    console.log(videoCurrTime)

    function _onReady(event) {
        // access to player in all event handlers via event.target
        setVideo(event.target)
        // event.target.pauseVideo();
        console.log(event.target.getCurrentTime())
        videoIntervalRef.current = setInterval(() => {
            setVideoCurrTime(event.target.getCurrentTime())
            if (+event.target.getCurrentTime() >= +event.target.getDuration()) {
                setVideoPlaying(false)
                setFirstClick(true)
            }
        }, 1000)
        // console.log(event.target.getDuration())

        // sliderRef.current.attr('max', event.target.getDuration())

        // console.log(event.target.getDuration())
        // console.log(video?.getDuration())
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

    function onToggleVideo() {
        if (isVideoPlaying) {
            video.pauseVideo()
            // isVideoPlaying.current = false
            setVideoPlaying(false)
        } else {
            video.playVideo()
            // isVideoPlaying.current = true
            setVideoPlaying(true)
        }
    }

    return (
        <div className={className}>
            <section className="music-modal">
                <input type="text" placeholder='Search song' />
                <h2>MUSIC MODAL</h2>
                <YouTube className='hidden' videoId="yvlP4KYW7BE" opts={opts} onReady={_onReady} controls />
                <button onClick={onToggleVideo} className='play-pause-btn'>{isVideoPlaying ? <CiPause1 /> : <CiPlay1 />}</button>
                <input defaultValue="0" value={videoCurrTime} step={0.1} max={video?.getDuration()} type="range" onChange={handleChange} />
            </section>
            <div onClick={() => setMusicModalOpen(false)} className="black-bg"></div>
        </div>

    )
}