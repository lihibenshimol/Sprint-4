import React from 'react'
import { Link } from 'react-router-dom'
import collage1 from '../assets/img/homepage-1collage.png'
import whiteWave from '../assets/img/white-wave-bg.svg'

export function HomePage() {

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
            {/* <div className='white-wave'><img src={whiteWave} alt="waveee" /> </div> */}


            <div className='app-desc'>
                <section className='desc'>
                    <h2>A productivity powerhouse</h2>
                    <h3>Simple, flexible, and powerful. All it takes are boards,
                        lists, and cards to get a clear view of who’s doing what and what needs to get done.
                        Learn more in our guide for getting started.</h3>
                </section>
            </div>

            <div className=''>


            </div>
        </section >
    )
}