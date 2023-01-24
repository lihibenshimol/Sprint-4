import { httpService } from './http.service'
import { storageService } from './async-storage.service'
// import { userService } from './user-service'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'
// import { getActionRemoveActivity, getActionAddActivity } from '../store/activity.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'

// ;(() => {
//   socketService.on(SOCKET_EVENT_REVIEW_ADDED, (activity) => {
//     console.log('GOT from socket', activity)
//     store.dispatch(getActionAddActivity(activity))
//   })
//   socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (activity) => {
//     showSuccessMsg(`New activity about me ${activity.txt}`)
//   })
// })()


export const activityService = {
  add,
  query,
  remove,
//   getDefaultFilter
}

function query(filterBy) {
  var queryStr = (!filterBy) ? '' : `?onCardId=${filterBy.cardId}`
  return httpService.get(`activity${queryStr}`)
  // return storageService.query('activity')
}

async function remove(activityId) {
  await httpService.delete(`activity/${activityId}`)
  // await storageService.remove('activity', activityId)
}

// function getDefaultFilter() {
//   return { toyId: ''}
// }

async function add({txt, boardId, groupId, cardId}) {
    
  const addedActivity = await httpService.post(`activity`, {txt, boardId, groupId, cardId})
  return addedActivity
}