<template>
  <v-card class="card-article" elevation="5">
    <div class="article-content" @click="toDisplay">
      <p>{{new Date(article.createdAt).toLocaleString()}}</p>
      <v-img
        class="elevation-3"
        :src="article.image"
        aspect-ratio="2.75"
      ></v-img>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{article.title}}</h3>
          <div> {{ article.description }} </div>
        </div>
      </v-card-title>
    </div>
    <v-divider v-if="state == 'my'"></v-divider>
    <v-card-actions v-if="state == 'my'">
      <v-btn  color="blue white--text" @click="editThis">Edit</v-btn>
      <v-btn  color="red white--text" @click="deletThis">Delete</v-btn>
    </v-card-actions>
    <v-divider v-if="state == 'all'"></v-divider>
    <div id="info" v-if="state == 'all'">
      <v-list-tile-avatar>
        <v-img 
          :src="article.user.image"
          class="elevation-5"
        >
        </v-img>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{article.user.username}}</v-list-tile-title>
      </v-list-tile-content>
      <div id="tag-container">
        <TagChip v-for="tag in article.tags" :key="tag" :tag="tag" @getByTag="getByTag"></TagChip>
      </div>
    </div>
  </v-card>
</template>

<script>
import axios from 'axios'
import TagChip from './TagsChip.vue'
export default {
  props: ['state', 'article'],
  data () {
    return {
      
    }
  },
  methods : {
    deletThis() {
      axios({
        url: `http://localhost:3000/api/articles/${this.article._id}`,
        method: 'DELETE',
        headers: {
          token : localStorage.getItem('token')
        }
      })
      .then(result => {
        this.$toast.open({ message: 'Post Deleted !', type: 'is-success'})
        this.$emit('refresh', {
          page : 'articles',
          state : 'my'
        })
      })
      .catch(err => {
        console.log(err.response.data.message)
        this.$toast.open({ message: err.response.data.message, type: 'is-danger'})
      })
    },
    editThis() {
      axios({ 
        method: 'GET',
        url: `http://localhost:3000/api/articles/find/${this.article._id}`,
        headers: {
          token : localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.$emit('refresh', {
          page : 'edit',
          state : '',
          data
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    toDisplay() {
      this.$emit('refresh', {
        page : 'display',
        state : '',
        data : this.article
      })
    },
    getByTag(tag) {
      this.$emit('getByTag', tag)
    }
  },
  components : {
    TagChip
  }
}
</script>

<style scoped>
  .card-article {
    padding: 30px;
    margin: 2em;
    /* border-right: 1px solid black;
    border-left: 1px solid black; */
  }
  .article-content:hover{
    cursor: pointer;		
  }

  #info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #tag-container {
    display: flex;
  }
</style>
