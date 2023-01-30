import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { boardService } from '../services/board.service';
import speak from '../assets/img/miri/speak.gif'
import notSpeak from '../assets/img/miri/not-speak.gif'
import { RxCross2 } from 'react-icons/rx';
import { updateBoard } from '../store/board.actions';
import { socketService, SOCKET_EMIT_BOARD_UPDATED } from '../services/socket.service';
import { utilService } from '../services/util.service';

export function VoiceListener({ onOpenMusicModal, onAddGroup, board,
    setIsVoiceMode, isVoiceMode }) {

    useEffect(() => {
        SpeechRecognition.startListening({ language: 'en-US' })
    }, [])

    async function onSetClr(clr = utilService.makeClr()) {
        console.log('clr: ', clr)
            try {
                board.style = { backgroundColor: clr, backgroundImage: null }
                const savedBoard = await updateBoard(board)
                socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
            } catch (err) {
                console.log('Cant update board color')
            }
    }

    function clearVoice() {
        resetTranscript()
        setIsVoiceMode(!isVoiceMode)
    }

    const commands = [
        {
            command: 'color',
            callback: () => {
                onSetClr()
                setTimeout(() => clearVoice(), 0)
            }
        },
        {
            command: '* color',
            callback: (sentence) => {
                onSetClr()
                setTimeout(() => clearVoice(), 0)
            }
        },
        {
            command: '* change color to *',
            callback: (sentence, clr) => {
                onSetClr(clr)
                setTimeout(() => clearVoice(), 0)
            }
        },
        {
            command: 'change color to *',
            callback: (clr) => {
                onSetClr(clr)
                setTimeout(() => clearVoice(), 0)
            }
        },
        {
            command: '* open music',
            callback: () => {
                onOpenMusicModal()
                setTimeout(() => clearVoice(), 0)
            }
        },
        {
            command: '* open music *',
            callback: () => {
                onOpenMusicModal()
                setTimeout(() => clearVoice(), 0)
            }
        },
        {
            command: '* close music ',
            callback: () => {
                onOpenMusicModal()
                setTimeout(() => clearVoice(), 0)
            }
        },
        {
            command: '* close music *',
            callback: () => {
                onOpenMusicModal()
                setTimeout(() => clearVoice(), 0)
            }
        },

        {
            command: '* new list',
            callback: (sentence) => {
                const groupToAdd = boardService.getEmptyGroup()
                groupToAdd.title = 'New list'
                onAddGroup(groupToAdd)
                setTimeout(() => clearVoice(), 1000)
            }
        },
        {
            command: '* new list *',
            callback: (sentence, txt) => {
                const groupToAdd = boardService.getEmptyGroup()
                groupToAdd.title = txt
                onAddGroup(groupToAdd)
                setTimeout(() => clearVoice(), 1000)
            }
        },
    ]

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({ commands });

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }




    return (<>
        <div className='black-bg' onClick={() => setIsVoiceMode(!isVoiceMode)}></div>
        <div className="extras-menu flex miri-section" >
            <span className="title-container">
                <p>
                    Tommy
                </p>
                <span className='close-btn hover' onClick={() => setIsVoiceMode(!isVoiceMode)}>
                    <RxCross2 /></span>
            </span>
            <section className={`miri-container ${listening ? 'speaking' : ''}`} >
                <h2>I'm Tommy, your personal Assistant</h2>
                {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
                <div className='btn-container'>
                    {!listening &&
                        <button onClick={() => SpeechRecognition.startListening({ language: 'en-US' })}>Start</button>
                    }
                    {listening &&
                        <button onClick={SpeechRecognition.stopListening}>Stop</button>
                    }
                    <button onClick={resetTranscript}>Reset</button>
                </div>
                <div className='miri-response'>
                    <img src={listening ? speak : notSpeak} alt="" />
                </div>
                <p>{transcript ? transcript : 'You can ask me for new group, change board color and more'}</p>
            </section >
        </div >
    </>)
}