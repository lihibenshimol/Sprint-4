const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const boardService = require('../board/board.service')
const authService = require('../auth/auth.service')
const socketService = require('../../services/socket.service')
const activityService = require('./activity.service')

async function getActivities(req, res) {
    // console.log('req.query = ', req.query)
    try {
        const activities = await activityService.query(req.query)
        res.send(activities)
    } catch (err) {
        logger.error('Cannot get activities', err)
        res.status(500).send({ err: 'Failed to get activities' })
    }
}

async function deleteActivity(req, res) {
    try {
        const deletedCount = await activityService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove activity' })
        }
    } catch (err) {
        logger.error('Failed to delete activity', err)
        res.status(500).send({ err: 'Failed to delete activity' })
    }
}


async function addActivity(req, res) {

    var { loggedinUser } = req

    try {
        var activity = req.body
        activity.byUserId = loggedinUser._id
        activity.onBoardId = activity.boardId
        if (activity.cardId) activity.onCard = await boardService.getCardById(activity.boardId, activity.groupId, activity.cardId)
        if (activity.memberId) activity.onMemberId = activity.memberId

        activity = await activityService.add(activity)


        //after saving
        let activityToSend
        
        const byUser = { fullname: loggedinUser.fullname, imgUrl: loggedinUser.imgUrl}

        if (activity.onMemberId || activity.cardId) {
            let onMember = await userService.getById(activity.onMemberId)
            onMember = { fullname: onMember.fullname, imgUrl: onMember.imgUrl }
            activityToSend = {
                byUser,
                onMember,
                boardId: activity.onBoardId,
                cardId: activity.onCardId,
                txt: activity.txt
            }

        } else {
            activityToSend = {
                byUser,
                boardId: activity.onBoardId,
                txt: activity.txt
            }
        }


        // socketService.broadcast({ type: 'activity-added', data: activity, userId: loggedinUser._id })
        // socketService.emitToUser({ type: 'activity-about-you', data: activity, userId: activity.aboutUser._id })

        // const fullUser = await userService.getById(loggedinUser._id)
        // socketService.emitTo({ type: 'user-updated', data: fullUser, label: fullUser._id })

        res.send(activityToSend)

    } catch (err) {
        logger.error('Failed to add activity', err)
        res.status(500).send({ err: 'Failed to add activity' })
    }
}

module.exports = {
    getActivities,
    deleteActivity,
    addActivity
}