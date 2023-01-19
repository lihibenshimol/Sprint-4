import { boardService } from "../services/board.service.local.js";
// import { userService } from "../services/user.service.js";
import { store } from './store.js'
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARD, SET_BOARDS, UNDO_REMOVE_BOARD, UNDO_UPDATE_BOARD, UPDATE_BOARD } from "./board.reducer.js";

// Action Creators:
export function getActionRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}

export function getActionAddBoard(board) {
    return {
        type: ADD_BOARD,
        board
    }
}

export function getActionUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}

export function setCurrBoard(board) {
    store.dispatch({
        type: SET_BOARD,
        board
    })

}

export async function loadBoards() {
    try {
        const boards = await boardService.query()
        console.log('Boards from DB:', boards)
        store.dispatch({
            type: SET_BOARDS,
            boards
        })

    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        store.dispatch(getActionRemoveBoard(boardId))
        await boardService.remove(boardId)
    } catch (err) {
        console.log('Cannot remove board', err)
        store.dispatch({
            type: UNDO_REMOVE_BOARD,
        })
        throw err
    }
}

export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        console.log('Added Board', savedBoard)
        store.dispatch(getActionAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function updateBoard(board) {
    try {
        store.dispatch(getActionUpdateBoard({...board}))
        const savedBoard = await boardService.save(board);
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err);
        store.dispatch({
            type: UNDO_UPDATE_BOARD,
        })
        throw err;
    }
}

export async function updateCard(board, card, content, key) {
    card[key] = content
    updateBoard(board)
}