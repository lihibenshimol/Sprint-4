const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

const BOARD_COLLECTION = 'board'

async function query(filterBy) {
    try {
        if(filterBy.isStarred === 'true') filterBy.isStarred = true
        const criteria = {}
        if(filterBy.isStarred) criteria.isStarred = filterBy.isStarred

        const collection = await dbService.getCollection(BOARD_COLLECTION)
        const boards = await collection.find(criteria).toArray()
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection(BOARD_COLLECTION)
        const board = collection.findOne({ _id: ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}

async function getCardById(boardId, groupId, cardId) {
   
    try {
        const board = await getById(boardId)
        const group = board.groups.find(g => g.id === groupId)
        const card = group.cards.find(c => c.id === cardId)
        return card

    } catch (err) {
        logger.error(`while finding card ${cardId}`, err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection(BOARD_COLLECTION)
        await collection.deleteOne({ _id: ObjectId(boardId) })
        return boardId
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function add(board) {
    try {
        const collection = await dbService.getCollection(BOARD_COLLECTION)
        await collection.insertOne(board)
        return board
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}

async function update(board) {
    try {
        const boardToSave = {...board}
        delete boardToSave._id
        
        const collection = await dbService.getCollection(BOARD_COLLECTION)
        await collection.updateOne({ _id: ObjectId(board._id) }, { $set: boardToSave })
        return board
    } catch (err) {
        logger.error(`cannot update board ${board._id}`, err)
        throw err
    }
}

async function removeBoardMsg(boardId, msgId) {
    try {
        const collection = await dbService.getCollection(BOARD_COLLECTION)
        await collection.updateOne({ _id: ObjectId(boardId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add board msg ${boardId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    getCardById,
    add,
    update,
    // addBoardMsg,
    removeBoardMsg
}
