
function USER_LIST(state) {
  return state.userList
}

function LOADING(state) {
  return state.loading
}

function GET_SELECTED_USER(state) {
  return state.selectedUser
}

export default {
  USER_LIST,
  GET_SELECTED_USER,
  LOADING,
}
