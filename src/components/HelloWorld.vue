<template>
  <div class="hello">
    <h1>Usuarios de github en Madrid</h1>
    <div class="table-head">
      <div @click="sortBy('name')">Usuario</div>
      <div @click="sortBy('contributions')">Contributions</div>
    </div>
    <ul>
      <li v-for="user in userList">
          <div class="table-body">
            <div>
            <a :href="`https://github.com/${user.login}`" target="_blank">{{user.login}}</a>
            </div>
            <div>
              {{user.contributions}}
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
    filteredByName() {
      return this.userList.sort((a, b) => a.login - b.login)
    },
    filteredByContributions() {
      return this.userList.sort((a, b) => b.contributions - a.contributions)
    },
  },
  methods: {
    ...mapActions(['GET_USER_LIST']),
    sortBy(filter) {
      switch (filter) {
        case 'name':
          return this.filteredByName
        case 'contributions':
          return this.filteredByContributions
        default:
          return this.filteredByContributions
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
