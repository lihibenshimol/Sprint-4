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
    getEmptyBoard,
    addNewItem,
    getEmptyGroup

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

function getEmptyGroup() {
    return { title: '', cards: [], style: {} }
}

// async function addNewCard(group, card, arr) {
//     try {
//         card.id = utilService.makeId()
//         group.cards.push(card)
//         // const collection = await dbService.getCollection('toy')
//         // await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { msgs: msg } })
//         return card
//     } catch (err) {
//         console.log('failed');
//         // logger.error(`cannot add toy msg ${toyId}`, err)
//         throw err
//     }
// }

async function addNewItem(parent, entityToAdd, entityType) {
    console.log('entityToAdd = ', entityToAdd)

    try {
        entityToAdd.id = utilService.makeId()
        parent[entityType].push(entityToAdd)

        // const collection = await dbService.getCollection('toy')
        // await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { msgs: msg } })
        return entityToAdd
    } catch (err) {
        console.log('failed');
        // logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

function getEmptyBoard() {
    return {
        title: "",
        isStarred: false,
        style: { backgroundColor: '#026aa7' },
        // "createdBy": {
        //     "_id": "u101",
        //     "fullname": "Abi Abambi",
        //     "imgUrl": "http://some-img"
        // },
        // "style": {},
        labels: [
        ],
        // "members": [
        //     {
        //         "_id": "u101",
        //         "fullname": "Tal Tarablus",
        //         "imgUrl": "https://www.google.com"
        //     }
        // ],
        groups: [
        ]
    }
}

function _createDemoBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards || !boards.length) {
        boards = [{
            "_id": "b101",
            "title": "Sprint 4",
            "isStarred": false,
            // "createdBy": {
            //     "_id": "u101",
            //     "fullname": "Abi Abambi",
            //     "imgUrl": "http://some-img"
            // },
            "style": { backgroundColor: '#1d3557' },
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
            "members": [
                {
                    "_id": "u101",
                    "fullname": "Lihi Ben Shimol",
                    "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U047SNB2ZJ7-80770c376ebd-512"
                },
                {
                    "_id": "u102",
                    "fullname": "Aviad Malikan",
                    "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U049KFQF1CH-a47ef54f9294-512"
                },
                {
                    "_id": "u103",
                    "fullname": "Shay Skitel",
                    "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U049WM10DR6-7e045b387033-512"
                },
            ],
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



