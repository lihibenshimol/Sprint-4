const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const boardService = require('../board/board.service')
const authService = require('../auth/auth.service')
const socketService = require('../../services/socket.service')
const activityService = require('./activity.service')

async function getActivities(req, res) {
    console.log('req.query = ', req.query)
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
        activity.onBoard = await boardService.getById(activity.boardId)
        activity.onCard = await boardService.getCardById(activity.boardId, activity.groupId, activity.cardId)
        activity.onMember = activity.memberId
        activity = await activityService.add(activity)

        // // prepare the updated activity for sending out

        // Give the user credit for adding a activity
        // var user = await userService.getById(activity.byUserId)
        // user.score += 10
       

        // loggedinUser = await userService.update(loggedinUser)
        // activity.byUser = loggedinUser

        // User info is saved also in the login-token, update it
        // const loginToken = authService.getLoginToken(loggedinUser)
        // res.cookie('loginToken', loginToken)

        // delete activity.aboutUserId
        // delete activity.byUserId

        // socketService.broadcast({ type: 'activity-added', data: activity, userId: loggedinUser._id })
        // socketService.emitToUser({ type: 'activity-about-you', data: activity, userId: activity.aboutUser._id })

        // const fullUser = await userService.getById(loggedinUser._id)
        // socketService.emitTo({ type: 'user-updated', data: fullUser, label: fullUser._id })
       
        res.send(activity)

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