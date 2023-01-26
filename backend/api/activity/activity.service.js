const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')
const activityCollection = 'activity'

async function query(filterBy = {}) {
    console.log('filterBy = ', filterBy)
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection(activityCollection)
        // const activities = await collection.find(filterBy).toArray()
        var activities = await collection.aggregate([{ $sort: { _id: -1 } }, {
            $match: criteria
        },
        {
            $lookup:
            {
                localField: 'onMemberId',
                from: 'user',
                foreignField: '_id',
                as: 'onMember'
            }
        },
        {
            $unwind: '$onMember'
        },
        {
            $lookup:
            {
                localField: 'byUserId',
                from: 'user',
                foreignField: '_id',
                as: 'byUser'
            }
        },
        {
            $unwind: '$byUser'
        },
        {
            $lookup:
            {
                localField: 'onBoardId',
                from: 'board',
                foreignField: '_id',
                as: 'onBoard'
            }
        },
        {
            $unwind: '$onBoard'
        }
        ]).toArray()
        activities = activities.map(activity => {
            activity.txt
            activity.byUser = { id: activity.byUser._id, fullname: activity.byUser.fullname, imgUrl: activity.byUser.imgUrl }
            activity.onBoard = { id: activity.onBoard._id, title: activity.onBoard.title }
            activity.onMember = { id: activity.onMember._id, fullname: activity.onMember.fullname, imgUrl: activity.onMember.imgUrl }
            delete activity.byUserId
            delete activity.onBoardId
            delete activity.onMemberId
            return activity
        })
        return activities
    } catch (err) {
        logger.error('cannot find activities', err)
        throw err
    }

}

async function remove(activityId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection(activityCollection)
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(activityId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove activity ${activityId}`, err)
        throw err
    }
}


async function add(activity) {
    let activityToAdd
    try {
        if (activity.cardId || activity.memberId) {
            activityToAdd = {
                byUserId: ObjectId(activity.byUserId),
                onBoardId: ObjectId(activity.onBoardId),
                onCardId: activity.cardId,
                onMemberId: ObjectId(activity.memberId),
                txt: activity.txt
            }

        } else {
            activityToAdd = {
                byUserId: ObjectId(activity.byUserId),
                onBoardId: ObjectId(activity.onBoardId),
                txt: activity.txt
            }
        }

        const collection = await dbService.getCollection('activity')
        await collection.insertOne(activityToAdd)
        // await collection.updateOne({$push: activityToAdd,  $position: 0 })
        return activityToAdd
    } catch (err) {
        logger.error('cannot insert activity', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.onCardId === 'undefined') filterBy.onCardId = undefined
    if (filterBy.onCardId) criteria.onCardId = filterBy.onCardId
    return criteria
}

module.exports = {
    query,
    remove,
    add
}


