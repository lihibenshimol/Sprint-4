
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'cardDB'

// _createDemoBoards()

export const cardService = {
    // query,
    // getById,
    // save,
    // remove,
    // getEmptyBoard,
    // addBoardMsg
}
window.cs = cardService

// async function query() {
// const cards = await storageService.query(STORAGE_KEY)
// if (filterBy.txt) {
//     const regex = new RegExp(filterBy.txt, 'i')
//     cards = cards.filter(card => regex.test(card.vendor) || regex.test(card.description))
// }
// if (filterBy.price) {
//     cards = cards.filter(card => card.price <= filterBy.price)
// }
// return cards
// }

// function getById(cardId) {
//     return storageService.get(STORAGE_KEY, cardId)
// }

// async function remove(cardId) {
//     // throw new Error('Nope')
//     await storageService.remove(STORAGE_KEY, cardId)
// }

// async function save(card) {
//     let savedCard
//     if (card._id) {
//         savedCard = await storageService.put(STORAGE_KEY, card)
//     } else {
//         // Later, owner is set by the backend
//         // card.owner = userService.getLoggedinUser()
//         savedCard = await storageService.post(STORAGE_KEY, card)
//     }
//     return savedCard
// }

// function _createDemoBoards() {
    // let cards = utilService.loadFromStorage(STORAGE_KEY)
//     if (!cards || !cards.length) {
//         cards = [{
//             _id: 'c103',
//             title: 'Test groups',
//             label: ['funny'],
//             members: ['Aviad', 'Shay', 'Lihi'],
//             checklists: [
//                 {
//                     id: 'YEhmF',
//                     title: 'Checklist',
//                     todos: [
//                         {
//                             id: '212jX',
//                             title: 'To Do 1',
//                             isDone: false
//                         }
//                     ]
//                 }
//             ],
//         },
//         {
//             _id: 'c102',
//             title: 'Test groups number 2',
//             label: ['funny', 'important', 'suggested'],
//             members: ['Lihi', 'Shay'],
//             checklists: [
//                 {
//                     id: 'f11f123',
//                     title: 'Todos',
//                     todos: [
//                         {
//                             id: '213jX',
//                             title: 'To Do 2',
//                             isDone: false
//                         }
//                     ]
//                 }
//             ],
//         },
//         ]

//         // utilService.saveToStorage(STORAGE_KEY, cards)
//     }
// }

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))