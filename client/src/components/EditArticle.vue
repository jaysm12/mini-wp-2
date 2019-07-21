<template>
  <form @submit.prevent="edit">
    <v-layout id="create-article" column elevate="10">
      <div id="flex">
        <div id="input-text">
          <v-text-field
            hint="What's your article about ?"
            label="Title"
            v-model="editArticle.title"
          ></v-text-field>
          <v-text-field
            hint="Describe your article in the best way possible !"
            label="Description"
            v-model="editArticle.description"
          ></v-text-field>
        </div>
        </div>
        <div id="up-image">
          <input type="file" name="" id="" @change="getPreview" ref="image">
          <div id="image-preview-container">
            <v-card id="card-imgpreview" elevation="5" width="350px">
              <v-img
                :src="imagePreview ? imagePreview  : editArticle.image"
                :lazy-src="`https://picsum.photos/10/6?image=20`"
                class="grey lighten-2"
                    ></v-img>
            </v-card>
          </div>
      </div>
      <div :class="imagePreview ? 'wisiwik' : ''">
        <editor api-key="4f5s0ns2x3wonggglzxk433520ia7e08uzap3389l5u7ydnf" :init="{menubar: false}" v-model="editArticle.content"></editor>
        <v-btn type="submit" class="blue white--text" >Edit</v-btn>
        <v-btn class="blue white--text" v-if="editArticle.content" @click.stop="dialog = true">Preview</v-btn>
      </div>
        <v-dialog v-model="dialog" max-width="80%"  scrollable >
          <v-card min-height="300">
            <div v-html="editArticle.content" id="preview-content"></div>
          </v-card>
        </v-dialog>
    </v-layout>
  </form>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'
export default {
  name: 'form-article',
  props: ['article'],
  data() {
    return {
      dialog: false,
      imagePreview: ''
    }
  },
  methods: {
    getPreview(e) {
      const file = e.target.files[0];
      if(!file) return
      this.editArticle.image = file
      this.imagePreview = URL.createObjectURL(file);
    },
    edit() {
      let formData = new FormData()
      formData.append('title', this.editArticle.title)
      formData.append('description', this.editArticle.description)
      formData.append('content', this.editArticle.content)
      formData.append('image', this.editArticle.image)
      axios({
        url: `http://localhost:3000/api/articles/${this.article._id}`,
        method: 'PUT',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          token : localStorage.getItem('token')
        }
      })
      .then(result => {
        this.$toast.open({ message: 'Article Edited !', type: 'is-success'})
        this.$emit('toMyArticle', {
          page : 'articles',
          state: 'my'
        })
      })
      .catch(err => {
        console.log(err.response.data.message)
        this.$toast.open({ message: err.response.data.message, type: 'is-danger'})
      })
    }
  },
  components : {
    Editor
  },
  computed : {
    editArticle() {
      return this.article
    }
  }
}
</script>

<style scoped>
  #flex {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
  #input-text {
    width: 50%;
  }
  #up-image {
    /* align-self: center; */
    margin-bottom: 3em;
  }
  #create-article {
    /* border: 2px solid black; */
    padding: 10px;
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  }
  #image-preview-container {
    margin-top: 10px;
  }
  .wisiwik {
    margin-bottom: 40%;
  }
  #card-title {
    height: 10px  ;
  }
  #preview-content {
    padding: 20px;
  }
</style>
