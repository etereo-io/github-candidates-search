<template>
  <div class="hello">
    <div class="table-head">
      <div @click="sortBy('login')">Usuario</div>
      <div @click="sortBy('pullRequests')">Pull Requests</div>
      <div @click="sortBy('pushes')">Pushes</div>
      <div @click="sortBy('creates')">Repos creados</div>
      <div @click="sortBy('comments')">Issues comentadas</div>
      <div @click="sortBy('issues')">Issues abiertas</div>
    </div>
    <ul>
      <li v-for="user in userList">
          <div class="table-body">
            <div>
              <a :href="user.html_url" target="_blank">{{user.login}}</a>
            </div>
            <div>
              {{user.eventsData.pullRequests}}
            </div>
            <div>
              {{user.eventsData.pushes}}
            </div>
            <div>
              {{user.eventsData.creates}}
            </div>
            <div>
              {{user.eventsData.comments}}
            </div>
            <div>
              {{user.eventsData.issues}}
            </div>
          </div>
      </li>
    </ul>
    <div v-if="loading">
      <p>Fetching users: {{fetchedUsers}}</p>
      <p>Fetching events: {{fetchedEvents}}</p>
      <spinner></spinner>
    </div>
    <button @click="GET_USER_LIST">Get user list</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import spinner from './Spinner'

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  components: { spinner },
  computed: {
    ...mapGetters({
      userList: 'USER_LIST',
      loading: 'LOADING',
      fetchedEvents: 'FETCHED_EVENTS',
      fetchedUsers: 'FETCHED_USERS',
    }),
    filteredByLogin() {
      return this.userList.sort((a, b) => a.login - b.login)
    },
    filteredByPullRequests() {
      return this.userList.sort((a, b) => b.eventsData.pullRequests - a.eventsData.pullRequests)
    },
    filteredByPushes() {
      return this.userList.sort((a, b) => b.eventsData.pushes - a.eventsData.pushes)
    },
    filteredByCreates() {
      return this.userList.sort((a, b) => b.eventsData.creates - a.eventsData.creates)
    },
    filteredByComments() {
      return this.userList.sort((a, b) => b.eventsData.comments - a.eventsData.comments)
    },
    filteredByIssues() {
      return this.userList.sort((a, b) => b.eventsData.issues - a.eventsData.issues)
    },
  },
  methods: {
    ...mapActions(['GET_USER_LIST']),
    sortBy(filter) {
      switch (filter) {
        case 'login':
          return this.filteredByLogin
        case 'pullRequests':
          return this.filteredByPullRequests
        case 'pushes':
          return this.filteredByPushes
        case 'creates':
          return this.filteredByCreates
        case 'comments':
          return this.filteredByComments
        case 'issues':
          return this.filteredByIssues
        case 'avg':
          return this.filteredByAvg
        default:
          throw new Error('Error')
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-head, .table-body {
  display: flex;
}

.table-head > div, .table-body > div {
  flex: 1
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
