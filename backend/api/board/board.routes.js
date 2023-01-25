const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getBoards, getBoardById, addBoard, updateBoard, removeBoard, addBoardMsg, removeBoardMsg } = require('./board.controller')
const { addCard, addGroup } = require('./board.service')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getBoards)
router.get('/:id', getBoardById)
router.post('/', requireAuth, addBoard)
router.post('/:id/g/:groupId', requireAuth, addCard)
router.post('/:id/g', requireAuth, addGroup)
router.put('/:id', requireAuth, updateBoard)
router.delete('/:id', requireAuth, removeBoard)
// router.delete('/:id', requireAuth, requireAdmin, removeBoard)

router.post('/:id/msg', requireAuth, addBoardMsg)
router.delete('/:id/msg/:msgId', requireAuth, removeBoardMsg)

module.exports = router