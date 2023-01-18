import React from 'react'
import { Routes, Route } from 'react-router'
import { useLocation } from 'react-router-dom'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { BoardIndex } from './pages/board-index'
import { HomepageHeader } from './cmps/homepage-header'
import { Provider } from 'react-redux'
import { store } from './store/store'

export function RootCmp() {

    const location = useLocation()

    return (
        <>
         <Provider store={store}>
            {location.pathname === '/' ? <HomepageHeader /> : <AppHeader />}
            <main className='full'>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route element={<BoardIndex />} path='/board/:boardId' />
                </Routes>
            </main>
            {location.pathname === '/' && <AppFooter />}
         </Provider>
        </>
    )
}


