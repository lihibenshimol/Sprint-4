export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const EXPAND_LABELS = 'EXPAND_LABELS'
export const UNEXPAND_LABELS = 'UNEXPAND_LABELS'

const initialState = {
  isLoading: false,
  labelsExpanded: false
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case EXPAND_LABELS:
      return { ...state, labelsExpanded: true }
    case UNEXPAND_LABELS:
      return { ...state, labelsExpanded: false }
    default: return state
  }
}
