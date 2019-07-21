<template>
  <form @submit.prevent="createArticle">
    <v-layout id="create-article" column elevate="10">
      <div id="flex">
        <div id="input-text">
          <v-text-field
            hint="What's your article about ?"
            label="Title"
            v-model="newArticle.title"
          ></v-text-field>
          <v-text-field
            hint="Describe your article in the best way possible !"
            label="Description"
            v-model="newArticle.description"
          ></v-text-field>
        </div>
        </div>
        <div id="up-image">
          <input type="file" name="" id="" @change="getPreview" ref="image">
          <div id="image-preview-container">
            <v-card id="card-imgpreview" elevation="5" width="350px">
              <v-img
                :src="imagePreview"
                v-if="imagePreview"
                :lazy-src="`https://picsum.photos/10/6?image=20`"
                class="grey lighten-2"
                    ></v-img>
            </v-card>
          </div>
        <div id="tags">
          <v-text-field 
            hint="Add tag for your article"
            label="Add Tags"
            v-model="tagInput"
          ></v-text-field>
          <v-btn 
            color="blue white--text"
            @click="addTag"
          >Add tag</v-btn>
        </div>
        <div id="chip-container">
          <v-chip v-for="(tag, index) in tags" :key="index"
            v-model="tags[index]"
            close
            color="blue white--text"
          > {{tag}}</v-chip>
        </div>
      </div>
      <div :class="imagePreview ? 'wisiwik' : ''">
        <editor api-key="4f5s0ns2x3wonggglzxk433520ia7e08uzap3389l5u7ydnf" :init="{menubar: false}" v-model="newArticle.content"></editor>
        <v-btn type="submit" class="blue white--text" >Post</v-btn>
        <v-btn class="blue white--text" v-if="newArticle.content" @click.stop="dialog = true">Preview</v-btn>
      </div>
        <v-dialog v-model="dialog" max-width="80%"  scrollable >
          <v-card min-height="300">
            <div v-html="newArticle.content" id="preview-content"></div>
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
  props: [],
  data() {
    return {
      tagInput: '',
      dialog: false,
      tags: [],
      newArticle : {
        title: '',
        description : '',
        image: '',
        content: '',
      },
      imagePreview: ''
    }
  },
  methods: {
    getPreview(e) {
      const file = e.target.files[0];
      if(!file) return
      this.newArticle.image = file
      this.imagePreview = URL.createObjectURL(file);
    },
    createArticle() {
      let formData = new FormData()
      formData.append('title', this.newArticle.title)
      formData.append('description', this.newArticle.description)
      formData.append('content', this.newArticle.content)
      formData.append('image', this.newArticle.image)
      formData.append('tags', this.tags)
      axios({
        url: 'http://localhost:3000/api/articles',
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          token : localStorage.getItem('token')
        }
      })
      .then(result => {
        this.$toast.open({ message: 'Article Posted !', type: 'is-success'})
        this.$emit('toMyArticle', {
          page : 'articles',
          state: 'my'
        })
      })
      .catch(err => {
        console.log(err.response.data.message)
        this.$toast.open({ message: err.response.data.message, type: 'is-danger'})
      })
    },
    addTag() {
      for(let i in this.tags) {
        if(this.tagInput == this.tags[i]) {
          return this.$toast.open({ message: 'You cant add duplicate tag !', type: 'is-danger'})
        }
      }
      this.tags.push(this.tagInput)
      this.tagInput = ''
    }
  },
  components : {
    Editor
  },
  watch: {
    tags() {
      let tagArr = this.tags
      if(this.tags.length != 0) {
        for(let i in tagArr) {
          if(!tagArr[i]) {
            this.tags.splice(i, 1)
          }
        }
      } 
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
  #tags {
    display: flex;
  }
</style>
