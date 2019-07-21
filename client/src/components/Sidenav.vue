<template>
    <v-card class="d-inline-block elevation-5" width="250" id="menu">
      <p id="username-display">{{loggedUser.username}}</p>
      <v-img :src="loggedUser.image"
          height="200px">
      </v-img>
        <v-list dense>
          <v-list-tile
            v-for="item in items"
            :key="item.title"
            @click="changePage(item)"
            :class="page == item.page && state == item.state ? 'blue white--text' : ''"
            class="item"
          >
            <v-list-tile-action>
              <v-icon :color="page == item.page && state == item.state ? 'white' : ''">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>
export default {
  name: 'sidenav',
  props: ['page', 'state', 'loggedUser'],
  data() {
    return {
      items: [
          { title: 'My Articles', icon: 'dashboard', page: 'articles', state: 'my' },
          { title: 'All Articles', icon: 'list', page: 'articles', state: 'all' },
          { title: 'Create New Article', icon: 'insert_drive_file', page: 'create', state: 'non'},
          { title: 'Profile Setting', icon: 'account_box', page: 'profile', state: 'non'}
        ],
        right: null
    }
  },
  methods : {
    changePage(input) {
      this.$emit('changePage', input)
    }
  }
}
</script>

<style lang="scss" scoped>
  #menu {
    position: fixed;
    // margin: 20px;
  }
  .item {
    transition: none;
  }
  #username-display {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #2195F2;
    border-bottom: 3px solid #2195F2;
    padding: 7px 0;
    margin: 0;
  }
</style>

