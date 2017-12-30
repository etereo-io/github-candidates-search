import * as types from '../mutation-types'
import githubState from './state'

const mutations = {
  [types.SET_USER_LIST](state, { userList }) {
    githubState.userList = userList
    githubState.loading = false
  },

  [types.SET_LOADING](state, { loading }) {
    githubState.loading = loading
  },

  [types.USER_EVENT_RECEIVED](state) {
    githubState.fetchedEvents = state.fetchedEvents + 1
  },

  [types.USER_FETCHED](state) {
    githubState.fetchedUsers = state.fetchedUsers + 1
  },

  [types.SET_SELECTED_USER](state, data) {
    console.log('foo', data)
  },
}

export default mutations
