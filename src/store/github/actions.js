import axios from 'axios'
import * as types from '../mutation-types'
import APIURL from './api-constants'

function GET_USER_LIST({ commit }) {
  commit(types.SET_LOADING, { loading: true })
  return axios.get(APIURL)
    .then((res) => {
      const userList = res.data.filter(i => i)
      commit(types.SET_USER_LIST, { userList })
    })
}

function SORT_USER_LIST() {
  console.log('test')
}

export default {
  GET_USER_LIST,
  SORT_USER_LIST,
}
