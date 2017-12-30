
function USER_LIST(state) {
  return state.userList
}

function LOADING(state) {
  return state.loading
}

function GET_SELECTED_USER(state) {
  return state.selectedUser
}

function FETCHED_EVENTS(state) {
  return state.fetchedEvents
}

function FETCHED_USERS(state) {
  return state.fetchedUsers
}

export default {
  USER_LIST,
  GET_SELECTED_USER,
  LOADING,
  FETCHED_EVENTS,
  FETCHED_USERS,
}
