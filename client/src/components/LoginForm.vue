<template>
  <v-card width="40%" id="card-form" elevation="10">
    <p id="title">Login to Worudo</p>
    <v-form
      ref="form"
      @submit.prevent="login"
    >
      <v-text-field
        v-model="loginInput.email"
        label="Email"
        required
      ></v-text-field>

      <v-text-field
        :append-icon="show1 ? 'visibility' : 'visibility_off'"
        v-model="loginInput.password"
        :type="show1 ? 'text' : 'password'"
        label="Password"
        @click:append="show1 = !show1"
        counter
        required
      ></v-text-field>

      <div id="option">
        <v-btn
          color="blue white--text"
          type="submit"
        >
          Login
        </v-btn>
        <v-btn
          color="red white--text"
          @click="reset"
        >
          Clear
        </v-btn>
      </div>
      <v-divider></v-divider>
      <div id="gsign">
        <div id="google-signin-button"></div>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  name: 'loginform',
  data() {
    return {
      show1: false,
      loginInput : {
        email : '',
        passsword: ''
      }
    }
  },
   methods: {
     login() {
       axios({
         url: 'http://localhost:3000/api/users/login',
         method: 'POST',
         data: this.loginInput
       })
       .then(({data}) => {
         let {token, payload} = data
         localStorage.setItem('token', token)
         localStorage.setItem('user', JSON.stringify(payload))
         this.$emit('login')
         this.$toast.open({ message: 'You logged in !', type: 'is-success'})
       })
       .catch(err => {
         console.log(err.response.data.message)
         this.$toast.open({ message: err.response.data.message, type: 'is-danger'})
       })
     },
    reset () {
      this.$refs.form.reset()
    },
    onSignIn(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      let token = id_token
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/users/google-sign-in',
        data: {
          token
        }
      })
      .then(({data}) => {
        let {token, payload} = data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(payload))
        this.$emit('login')
        this.$toast.open({ message: 'You logged in !', type: 'is-success'})
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    }
  },
  mounted() {
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
  }
}
</script>

<style scoped>
  #gsign {
    margin: 0 auto;
    width: 120px;
  }
  #card-form  {
    padding: 2em;
    margin: auto;
  }
  #title {
    margin: 0;
    font-size: 24px;
    text-align: center;
  }
  #option {
    margin: auto;
    margin-top: 30px;
    text-align: center;
  }
</style>
