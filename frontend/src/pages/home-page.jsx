import React from 'react'
import { Link } from 'react-router-dom'
import collage1 from '../assets/img/homepage-1collage.png'
import asset1 from '../assets/img/asset1.png'
import asset2 from '../assets/img/asset2.png'
import asset3 from '../assets/img/asset3.png'
import { useState } from 'react'

export function HomePage() {
    const [dynImg, setDynImg] = useState(asset1)

    function handleClick(imgNum) {
        setDynImg(`asset+${imgNum}`)
    }

    return (
        <section className='home-page '>

            <div className='main-hero full main-layout'>
                <section className='signup-intro'>
                    <h2>Trello brings all your tasks, teammates, and tools together</h2>
                    <h3>Keep everything in the same place—even if your team isn’t.</h3>
                    <Link to="/board">Start demo</Link>

                </section>
                <section className='collage1'>
                    <img src={collage1} alt="img" />
                </section>
            </div>

            <div className='app-desc'>
                <section className='desc'>
                    <h2>A productivity powerhouse</h2>
                    <h3>Simple, flexible, and powerful. All it takes are boards,
                        lists, and cards to get a clear view of who’s doing what and what needs to get done.
                        Learn more in our guide for getting started.</h3>
                </section>
            </div>

            <div className='boards-desc'>
                <div className='tabs'>
                    <button onClick={() => setDynImg(asset1)} className='tab tab1'>
                        <h4>Boards</h4>
                        <p>Trello boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”</p>
                    </button>
                    <button onClick={() => setDynImg(asset2)} className='tab tab2'>
                        <h4>Lists</h4>
                        <p>The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team’s needs. There’s no wrong way to Trello.</p>
                    </button>
                    <button onClick={() => setDynImg(asset3)} className='tab tab3'>
                        <h4>Cards</h4>
                        <p>Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.</p>
                    </button>
                </div>

                <div className='dyn-img'>
                    <img src={dynImg} alt="" />
                </div>
            </div>
        </section >
    )
}