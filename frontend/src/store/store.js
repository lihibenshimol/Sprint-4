import { createStore, combineReducers } from 'redux'
import { boardReducer } from './board.reducer'
import { userReducer } from './user.reducer'
import { systemReducer } from './system.reducer'
import { activityReducer } from './activity.reducer'

const rootReducer = combineReducers({
    boardModule: boardReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    activityModule: activityReducer,
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })



