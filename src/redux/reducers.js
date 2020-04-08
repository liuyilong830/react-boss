import {combineReducers} from 'redux'

function user(state = {}, action) {
  return state
}
function count(state = 0, action) {
  return state
}

export default combineReducers({
  user,
  count
})