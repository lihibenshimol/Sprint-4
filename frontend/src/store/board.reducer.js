export const SET_BOARD = 'SET_BOARD'
export const SET_BOARDS = 'SET_BOARDS'
export const SET_RECENT_BOARDS = 'SET_RECENT_BOARDS'
export const SET_STARRED_BOARDS = 'SET_STARRED_BOARDS'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const UPDATE_STARRED_BOARDS = 'UPDATE_STARRED_BOARDS'
export const UNDO_REMOVE_BOARD = 'UNDO_REMOVE_BOARD'
export const UNDO_UPDATE_BOARD = 'UNDO_UPDATE_BOARD'

const initialState = {
    boards: [],
    starredBoards: [],
    recentBoards: [],
    currBoard: null,
    lastRemovedBoard: null,
    lastUpdatedBoard: null
}

export function boardReducer(state = initialState, action) {
    let boards
    let starredBoards
    let recentBoards
    let lastRemovedBoard
    let lastUpdatedBoard
    let currBoard

    switch (action.type) {
        case SET_BOARD:
            return { ...state, currBoard: action.board }

        case SET_BOARDS:
            return { ...state, boards: action.boards }

        case SET_RECENT_BOARDS:
            return { ...state, recentBoards: action.boards }

        case SET_STARRED_BOARDS:
            return { ...state, starredBoards: action.boards }

        case REMOVE_BOARD:
            lastRemovedBoard = state.boards.find(b => b._id === action.boardId)
            boards = state.boards.filter(b => b._id !== action.boardId)
            return { ...state, boards, lastRemovedBoard }

        case UNDO_REMOVE_BOARD:
            ({ lastRemovedBoard } = state)
            boards = [lastRemovedBoard, ...state.boards]
            return { ...state, boards, lastRemovedBoard: null }

        case UNDO_UPDATE_BOARD:
            ({ lastUpdatedBoard } = state)
            currBoard = lastUpdatedBoard
            return { ...state, currBoard, lastUpdatedBoard: null }

        case ADD_BOARD:
            boards = [...state.boards, action.board]
            return { ...state, boards }

        case UPDATE_BOARD: 
            lastUpdatedBoard = {...state.currBoard }
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            return { ...state, currBoard: action.board, boards, lastUpdatedBoard }

        case UPDATE_STARRED_BOARDS:
            starredBoards = state.starredBoards.map(board => (board._id === action.board._id) ? action.board : board).filter(board => board.isStarred)
            const starredBoard = starredBoards.findIndex(board => board._id === action.board._id)
            if(starredBoard === -1 && action.board.isStarred) starredBoards.push(action.board) 
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            currBoard = state.currBoard?._id === action.board._id ? action.board : state.currBoard
            return { ...state, starredBoards, boards, currBoard }

        default:
            return state
    }
}
