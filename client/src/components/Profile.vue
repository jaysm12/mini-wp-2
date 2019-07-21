<template>
  <v-container id="profile-container">
    <v-card 
    id="profile-card"
    width="80%"
    height="100%"
    elevation="4"
    >
      <v-card-title
        class="headline blue white--text"
        id="profile-title"
            >
          <p>Profile</p>
          <p>{{loggedUser.username}}</p>
      </v-card-title>
      <div id="profile-content">
        <form  @submit.prevent="updateProfile" >
          <v-text-field
            label="Username"
            v-model="editProfile.username"
            hint="edit username" ></v-text-field>
          <v-text-field
            label="Email"
            v-model="editProfile.email"
            hint="edit email" ></v-text-field>
          <v-text-field
            label="Edit Password"
            type="password"
            v-model="editProfile.password"
            hint="Enter new password" ></v-text-field>
          <input type="file" name="" id="" @change="getPreview" ref="image" style="display: none">
          <div id="image-profile-container">
            <v-card id="profile-imgpreview" elevation="5" width="250">
              <v-img
                :src="imagePreview"
                v-if="imagePreview"
                :lazy-src="`https://picsum.photos/10/6?image=20`"
                height="200px"
                class="grey lighten-2"
                    ></v-img>
            </v-card>
          </div>
          <v-btn color="blue white--text" @click="triggerImage">Change profile picture</v-btn>
          <v-btn 
          block 
          id="submit-update" 
          type="submit" 
          
          color="blue white--text"
          >Save</v-btn>
        </form>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name:'profile',
  props: ['loggedUser'],
  data() {
    return {
      editProfile : {
        password: ''
      },
      imagePreview: ''
    }
  },
  created() {
    for(let i in this.loggedUser) {
      this.editProfile[i] = this.loggedUser[i]
    }
    this.imagePreview = this.loggedUser.image
  },
  methods : {
    getPreview(e) {
      const file = e.target.files[0];
      if(!file) return
      this.editProfile.image = file
      this.imagePreview = URL.createObjectURL(file);
    },
    triggerImage() {
      this.$refs.image.click()
    },
    updateProfile() {
      let formData = new FormData() 
      formData.append('email', this.editProfile.email)
      formData.append('username', this.editProfile.username)
      formData.append('password', this.editProfile.password)
      formData.append('image', this.editProfile.image)
      axios({
        url: `http://localhost:3000/api/users/update/${this.loggedUser._id}`,
        method: 'PUT',
        data: formData,
        headers: {
        'Content-Type': 'multipart/form-data',
        token : localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.$emit('updateProfile', data)
        this.$toast.open({ message: 'Profile Updated !', type: 'is-success'})
      })
      .catch(err => {
        console.log(err)
        this.$toast.open({ message: err.response.data.message, type: 'is-danger'})
      })
    },
  }
}
</script>

<style scoped>
  #profile-title{
    display: flex;
    justify-content: space-between;
  }
  #profile-content {
    padding: 2.5em;
  }
  #image-profile-container {
    margin: 10px;
  }
  #submit-update {
    margin: 1em auto;
    width: 90px;
  }
</style>
