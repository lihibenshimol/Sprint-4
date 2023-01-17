import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export function HomePage() {

    return (
        <section className='home-page full main-container'>
            <h2>Trello brings all your tasks, teammates, and tools together</h2>
            <h3>Keep everything in the same place—even if your team isn’t.</h3>
            <Link to="/board">Start demo</Link>
        </section >
    )
}