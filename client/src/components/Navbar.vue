<template>
  <div id="nav">
    <v-toolbar id="bar" dark color="white"  height="45" fixed v-scroll="onScroll">
      <v-layout justify-space-between align-center>
        <v-toolbar-title class="black--text" id="title">Worudo Press</v-toolbar-title>
        <div>
          <v-btn class="light-blue darken-3" depressed flat v-if="!isLogin" @click="$emit('changeType', 'login')">Login</v-btn>
          <v-btn class="light-blue darken-3" depressed flat v-if="!isLogin" @click="$emit('changeType', 'register')">Register</v-btn>
          <v-btn class="blue lighten-1" depressed flat v-if="isLogin && isScrolled > 500" @click="toTop">Go to top</v-btn>
          <v-btn class="red lighten-1" depressed flat v-if="isLogin" @click="logout">Logout</v-btn>
        </div>
      </v-layout>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['isLogin'],
  data() {
    return {
      scroll: 0
    }
  },
  methods : {
    toTop() {
      this.$vuetify.goTo(0)
    },
    onScroll(e) {
      this.scroll = window.pageYOffset || document.documentElement.scrollTop
    },
    logout() {
      this.$emit('logout')
    }
  },
  computed: {
    isScrolled() {
      return this.scroll
    }
  }
}
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Merriweather&display=swap');
  #title {
    font-size: 24px;
    font-family: 'Merriweather', serif;
  }
  #bar {
    padding: 5px 0;
  }
</style>
