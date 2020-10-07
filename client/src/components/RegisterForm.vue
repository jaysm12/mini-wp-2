<template>
  <v-card width="40%" id="card-form" elevation="10">
    <p id="title">Register to Worudo</p>
    <v-form
      ref="form"
      @submit.prevent="register"
    >
      <v-text-field
        v-model="registerInput.email"
        :rules="[rules.required, rules.email]"
        label="Email"
        required
      ></v-text-field>
      <v-text-field
        v-model="registerInput.username"
        label="Username"
        :rules="[rules.required, rules.username]"
        hint="Max 15 characters"
        counter
        required
      ></v-text-field>
      <v-text-field
        :append-icon="show1 ? 'visibility' : 'visibility_off'"
        v-model="registerInput.password"
        :type="show1 ? 'text' : 'password'"
        :rules="[rules.required, rules.min]"
        label="Password"
        @click:append="show1 = !show1"
        hint="At least 8 characters"
        counter
        required
      ></v-text-field>
      <input type="file" ref="image" style="display: none;"  @change="getPreview">
      <v-btn
      color="blue white--text"
      id="choose-btn"
      @click="triggerImage"
      >Choose Profile Picture</v-btn>
      <div id="image-profile-container" v-if="imagePreview">
        <v-card id="profile-imgpreview" elevation="5" width="250">
          <v-img
            :src="imagePreview"
            :lazy-src="`https://picsum.photos/10/6?image=20`"
            height="200px"
            class="grey lighten-2"
                ></v-img>
        </v-card>
      </div>
      <div id="option">
        <v-btn
          color="blue white--text"
          type="submit"
        >
          Register
        </v-btn>
        <v-btn
          color="red white--text"
          @click="reset"
        >
          Clear
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  name: 'registerform',
  data() {
    return {
      show1: false,
      registerInput : {
        email : '',
        password: '',
        username: '',
        image: ''
      },
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        username: v => v.length <= 15 || 'Max 15 characters',
        email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.' }
      },
      imagePreview: ''
    }
  },
   methods: {
    register() {
      let formData = new FormData() 
      formData.append('email', this.registerInput.email)
      formData.append('username', this.registerInput.username)
      formData.append('password', this.registerInput.password)
      formData.append('image', this.registerInput.image)
       axios({
         url: 'http://54.255.210.197/api/users/register',
         method: 'POST',
         data: formData,
         headers: {
          'Content-Type': 'multipart/form-data',
        }
       })
       .then(result => {
         this.$toast.open({ message: 'Account Created !', type: 'is-success'})
         this.$emit('toLogin')
       })
       .catch(err => console.log(err.response.data.message))
    },
    reset () {
      this.$refs.form.reset()
    },
    getPreview(e) {
      const file = e.target.files[0];
      if(!file) return
      this.registerInput.image = file
      this.imagePreview = URL.createObjectURL(file);
    },
    triggerImage() {
      this.$refs.image.click()
    },
  }
}
</script>

<style scoped>
  #card-form  {
    padding: 2em;
    margin: auto;
  }
  #title {
    margin: 0;
    font-size: 24px;
    text-align: center;
  }
  #choose-btn {
    width: 15em;
    margin: 20px 0;
    /* margin-left: 0.5em; */
  }
  #option {
    margin: auto;
    margin-top: 30px;
    text-align: center;
  }
</style>
