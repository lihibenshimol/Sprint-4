import React from 'react'
import { Routes, Route } from 'react-router'
import { useLocation } from 'react-router-dom'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { BoardDetails } from './pages/board-details'
import { HomepageHeader } from './cmps/homepage-header'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { CardDetails } from './pages/card-details'

export function RootCmp() {

    const location = useLocation()

    return (
        <>
            <Provider store={store}>
                {location.pathname === '/' ? <HomepageHeader /> : <AppHeader />}
                <main className='full'>
                    <Routes>
                        {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                        <Route element={<BoardDetails />} path='/board/:boardId'>
                            <Route element={<CardDetails />} path='/board/:boardId/g/:groupId/c/:cardId' />
                        </Route>
                    </Routes>
                </main>
            </Provider>

        </>
    )
}


