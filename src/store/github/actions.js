import axios from 'axios'

import { USERS_URL, TOKEN, APIURL } from './api-constants'
import { countItems, buildQueryString, mergeUsersAndEvents } from './helpers'

import * as types from '../mutation-types'

let userList = []

export function fetchUserEvents(url) {
  const headers = { Authorization: TOKEN }
  const options = { headers }


  return axios.get(url, options)
    .then((events) => {
      const eventsData = {
        login: events.data.length > 0 ? events.data[0].actor.login : null,
        creates: countItems(events.data, 'CreateEvent'),
        pushes: countItems(events.data, 'PushEvent'),
        pullRequests: countItems(events.data, 'PullRequestEvent'),
        issues: countItems(events.data, 'IssuesEvent'),
        comments: countItems(events.data, 'IssueCommentEvent'),
      }

      return eventsData
    })
}

function fetchAllUserEvents(users) {
  const eventsUrls = users.map(item => `${APIURL}/users/${item.login}/events`)
  return Promise.all(eventsUrls.map(fetchUserEvents))
}

function fetchPages(page = 1) {
  const q = buildQueryString({ type: 'user', location: 'madrid' })
  const headers = { Authorization: TOKEN }
  const params = { per_page: 100, page }
  const options = { headers, params }
  const url = `${USERS_URL}?q=${q}`
  return axios.get(url, options)
    .then((res) => {
      res.data.items.forEach((user) => {
        userList.push(user)
      })
      const link = res.headers.link.split(',')[1]
      const lastPage = link.substring(link.lastIndexOf('page=') + 5, link.lastIndexOf('>'))
      if (params.page < lastPage) {
        return fetchPages(page + 1)
      }
      return fetchAllUserEvents(userList)
    })
}

function GET_USER_LIST({ commit }) {
  userList = []
  commit(types.SET_LOADING, { loading: true })
  return fetchPages()
    .then((events) => {
      const users = mergeUsersAndEvents(userList, events)
      commit(types.SET_USER_LIST, { userList: users })
    })
}

function SORT_USER_LIST() {
  console.log('test')
}

export default {
  GET_USER_LIST,
  SORT_USER_LIST,
}
