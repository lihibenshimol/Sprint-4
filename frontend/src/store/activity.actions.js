import { activityService } from '../services/activity.service'
import { store } from './store.js'

// Action Creators
export function getActionRemoveActivity(activityId) {
  return { type: 'REMOVE_ACTIVITY', activityId }
}
export function getActionAddActivity(activity) {
  return { type: 'ADD_ACTIVITY', activity }
}
export function getActionSetWatchedUser(user) {
  return { type: 'SET_WATCHED_USER', user }
}



export async function loadActivities(filterBy = {}) {
  try {
    const activities = await activityService.query(filterBy)
    console.log('activities in actions = ', activities)
    store.dispatch({ type: 'SET_ACTIVITIES', activities })
    return activities
  } catch (err) {
    console.log('ActivityActions: err in loadActivities', err)
    throw err
  }
}

export async function addActivity(activity) {

  try {
    const addedActivity = await activityService.add(activity)
    store.dispatch(getActionAddActivity(addedActivity))
    
  } catch (err) {
    console.log('ActivityActions: err in addActivity', err)
    throw err
  }
}

export async function removeActivity(activityId) {
  try {
    await activityService.remove(activityId)
    store.dispatch(getActionRemoveActivity(activityId))
  } catch (err) {
    console.log('ActivityActions: err in removeActivity', err)
    throw err
  }
}