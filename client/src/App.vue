<template>
  <div :class="{ 'landing-bg' : !isLogin}" id="isi">
    <Navi :isLogin="isLogin" @changeType="goTo" @logout="logout"></Navi>
    <Inside v-if="isLogin" :loggedUser="loggedUser" class="content" @updateProfile="updateProfile"></Inside>
    <Outside v-if="!isLogin" :type="type" class="content" @login="login"></Outside>
    <v-footer fixed class="elevation-6" >
      <div id="footer"> 
        &copy;2019 —  <strong> Jays M </strong>  &nbsp; | Github :  &nbsp; <a href="https://github.com/jaysm12" target="_blank"> https://github.com/jaysm12</a>  
      </div>
    </v-footer>
  </div>
</template>
<script>
import Inside from './components/Inside.vue'
import Outside from './components/Outside.vue'
import Navi from './components/Navbar.vue'
export default {
  data() {
    return {
      message : 'Mantap',
      isLogin : localStorage.getItem('token') ? true : false,
      loggedUser: '',
      type: 'login'
    }
  },
  components : {
    Inside,
    Outside,
    Navi
  },
  methods : {
    goTo(payload) {
      this.type = payload
    },
    login() {
      this.isLogin = true
      this.loggedUser = JSON.parse(localStorage.getItem('user'))
    },
    logout() {
      this.isLogin = false
      this.$toast.open({ message: 'Logged out', type: 'is-success'})
      localStorage.clear()
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    },
    updateProfile(user) {
      this.loggedUser = {
        _id : user._id,
        username: user.username,
        email: user.email,
        image: user.image
      }
      localStorage.setItem('user', JSON.stringify(this.loggedUser))
    }
  },
  created() {
    if(this.isLogin) {
      this.loggedUser = JSON.parse(localStorage.getItem('user'))
    }
  }
}
</script>

<style>
.landing-bg  {
  background-image: url(https://cdn.pixabay.com/photo/2015/06/08/15/11/typewriter-801921_1280.jpg);
  background-attachment: fixed;
  height: 100%;
  width: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.content {
  height: 100%;
  width: 100%;
}
* {
  margin: 0;
  padding: 0;
}
html, body, #app {
  width: 100%;
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#footer {
  margin: 0 auto;
}
</style>

