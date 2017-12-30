import axios from 'axios'
import store from '../../store'
import { USERS_URL, TOKEN, APIURL } from './api-constants'
import { countItems, buildQueryString, mergeUsersAndEvents } from './helpers'

import * as types from '../mutation-types'

let userList = []
let totalEvents = []

function getTotalPages(linkHeader) {
  if (typeof linkHeader === 'undefined') {
    return 1
  }
  const link = linkHeader.split(',').find(i => i.indexOf('last'))
  return link.substring(link.lastIndexOf('page=') + 5, link.lastIndexOf('>'))
}

function getNextPage(linkHeader) {
  if (typeof linkHeader === 'undefined') {
    return 1
  }
  const link = linkHeader.split(',').find(i => i.indexOf('next'))
  return link.substring(link.lastIndexOf('page=') + 5, link.lastIndexOf('>'))
}

export function fetchUserEvents(url, page = 1) {
  const headers = { Authorization: TOKEN }
  const params = { page }
  const options = { headers, params }

  return axios.get(url, options)
    .then((events) => {
      store.commit(types.USER_EVENT_RECEIVED)
      events.data.forEach((item) => {
        totalEvents.push(item)
      })

      if (events.headers.link) {
        const totalPages = getTotalPages(events.headers.link) > 6 ? 6 :
        getTotalPages(events.headers.link)
        if (params.page <= totalPages) {
          return fetchUserEvents(url, getNextPage(events.headers.link))
        }
      }

      const eventsData = {
        login: totalEvents.length > 0 ? totalEvents[0].actor.login : null,
        creates: countItems(totalEvents, 'CreateEvent'),
        pushes: countItems(totalEvents, 'PushEvent'),
        pullRequests: countItems(totalEvents, 'PullRequestEvent'),
        issues: countItems(totalEvents, 'IssuesEvent'),
        comments: countItems(totalEvents, 'IssueCommentEvent'),
      }

      totalEvents = []

      return eventsData
    })
}

function fetchAllUserEvents(users) {
  const eventsUrls = users.map(item => `${APIURL}/users/${item.login}/events`)
  return Promise.all(eventsUrls.map(i => fetchUserEvents(i, 1)))
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
        store.commit(types.USER_FETCHED)
        userList.push({ login: user.login, html_url: user.html_url })
      })
      if (params.page <= getTotalPages(res.headers.link) && params.page <= 10) {
        return fetchPages(getNextPage(res.headers.link))
      }
      return fetchAllUserEvents(userList)
    })
}

function GET_USER_LIST({ commit }) {
  userList = []
  totalEvents = []
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
