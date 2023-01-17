import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { BoardIndex } from './pages/board-index'

export function RootCmp() {

    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route element={<BoardIndex />} path='/board/:boardId' />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


