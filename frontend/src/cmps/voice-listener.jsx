import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { boardService } from '../services/board.service';
import speak from '../assets/img/miri/speak.gif'
import notSpeak from '../assets/img/miri/not-speak.gif'
import { RxCross2 } from 'react-icons/rx';
import { updateBoard } from '../store/board.actions';
import { socketService, SOCKET_EMIT_BOARD_UPDATED } from '../services/socket.service';

export function VoiceListener({ onOpenMusicModal, onAddGroup, board,
    setIsVoiceMode, isVoiceMode }) {

    async function onSetClr(clr) {
        try {
            board.style = { backgroundColor: clr, backgroundImage: null }
            const savedBoard = await updateBoard(board)
            socketService.emit(SOCKET_EMIT_BOARD_UPDATED, savedBoard)
        } catch (err) {
            console.log('Cant update board color')
        }
    }



    const commands = [
        {
            command: '* say *',
            callback: (sentence, txt) => console.log(txt)
        },
        {
            command: '* change color to *',
            callback: (sentence, clr) => onSetClr(clr)
        },
        {
            command: '* open music',
            callback: () => onOpenMusicModal()
        },
        {
            command: '* open music *',
            callback: () => onOpenMusicModal()
        },
        {
            command: '* play music',
            callback: () => onOpenMusicModal()
        },
        {
            command: '* play music *',
            callback: () => onOpenMusicModal()
        },
        {
            command: '* close music ',
            callback: () => onOpenMusicModal()

        },
        {
            command: '* close music *',
            callback: () => onOpenMusicModal()

        },
        {
            command: 'create new group *',
            callback: (txt) => {
                const groupToAdd = boardService.getEmptyGroup()
                groupToAdd.title = txt
                onAddGroup(groupToAdd)
            }
        },
        {
            command: '* create new group *',
            callback: (sentence, txt) => {
                const groupToAdd = boardService.getEmptyGroup()
                groupToAdd.title = txt
                onAddGroup(groupToAdd)
            }
        },
        {
            command: 'open new group *',
            callback: (txt) => {
                const groupToAdd = boardService.getEmptyGroup()
                groupToAdd.title = txt
                onAddGroup(groupToAdd)
            }
        },
        {
            command: '* open new group *',
            callback: (sentence, txt) => {
                const groupToAdd = boardService.getEmptyGroup()
                groupToAdd.title = txt
                onAddGroup(groupToAdd)
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

                {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
                <div className='btn-container'>
                    <button onClick={() => SpeechRecognition.startListening({ language: 'en-US' })}>Start</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop</button>
                    <button onClick={resetTranscript}>Reset</button>
                </div>
                <div className='miri-response'>
                    <img src={listening ? speak : notSpeak} alt="" />
                </div>
                <p>{transcript}</p>
            </section >
        </div >
    </>)
}