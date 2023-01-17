
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'board'

_createDemoBoards()

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyCard,
    addNewCard
    // getEmptyBoard,
    // addBoardMsg
}
window.cs = boardService


async function query() {
    const boards = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     boards = boards.filter(board => regex.test(board.vendor) || regex.test(board.description))
    // }
    // if (filterBy.price) {
    //     boards = boards.filter(board => board.price <= filterBy.price)
    // }
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    let savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        // Later, owner is set by the backend
        // board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

function getEmptyCard() {
    return { title: '' }
}

// async function addBoardMsg(boardId, txt) {
//     // Later, this is all done by the backend
//     const board = await getById(boardId)
//     if (!board.msgs) board.msgs = []

//     const msg = {
//         id: utilService.makeId(),
//         // by: userService.getLoggedinUser(),
//         txt
//     }
//     board.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, board)

//     return msg
// }

// function getEmptyBoard() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }

async function addNewCard(group, card, board) {
    try {
        card.id = utilService.makeId()
        group.cards.push(card)
        save(board)
        // const collection = await dbService.getCollection('toy')
        // await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { msgs: msg } })
        return card
    } catch (err) {
        console.log('failed');
        // logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

function _createDemoBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards || !boards.length) {
        boards = [{
            "_id": "b101",
            "title": "First board",
            "isStarred": false,
            // "createdBy": {
            //     "_id": "u101",
            //     "fullname": "Abi Abambi",
            //     "imgUrl": "http://some-img"
            // },
            // "style": {},
            "labels": [
                {
                    "id": "l101",
                    "title": "Done",
                    "color": "#61bd4f"
                },
                {
                    "id": "l102",
                    "title": "Progress",
                    "color": "#61bd33"
                }
            ],
            // "members": [
            //     {
            //         "_id": "u101",
            //         "fullname": "Tal Tarablus",
            //         "imgUrl": "https://www.google.com"
            //     }
            // ],
            "groups": [
                {
                    "id": "g101",
                    "title": "Group 1",
                    // "archivedAt": 1589983468418,
                    "cards": [
                        {
                            "id": "c101",
                            "title": "Replace logo"
                        },
                        {
                            "id": "c102",
                            "title": "Add Samples"
                        }
                    ],
                    "style": {}
                },
                {
                    "id": "g102",
                    "title": "Group 2",
                    // "archivedAt": 1589983468418,
                    "cards": [
                        {
                            "id": "c103",
                            "title": "Test groups"
                        },
                        {
                            "id": "c104",
                            "title": "Test Cards"
                        }
                    ],
                    "style": {}
                },
            ]
        }]
        utilService.saveToStorage(STORAGE_KEY, boards)
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




