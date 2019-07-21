<template>
  <v-layout id="inside" row wrap>
    <v-flex xs3>
      <Sidenav :page="page" :state="state" @changePage="changePage" :loggedUser="loggedUser"></Sidenav>
    </v-flex>
    <v-flex md8 id="content-container"  >
      <div id="search-input" v-if="page == 'articles'">
        <v-text-field
            solo
            label="Search articles"
            prepend-inner-icon="search"
            v-model="searchInput"
          ></v-text-field>
      </div>
      <div id="content">
        <ArticlesList v-if="page == 'articles'" 
          :state="state" 
          :articles="filteredList" 
          @refresh="changePage"
          @getByTag="getByTag"
        ></ArticlesList>
        <FormArticle v-if="page == 'create'" @toMyArticle="changePage"></FormArticle>
        <Profile v-if="page == 'profile'" :loggedUser="loggedUser" @updateProfile="updateProfile"></Profile>
        <EditArticle v-if="page == 'edit'" :article="selectedArticle"  @toMyArticle="changePage" ></EditArticle>
        <DisplayArticle v-if="page == 'display'" :article="selectedArticle"></DisplayArticle>
      </div>
    </v-flex>
    <v-snackbar
      v-model="tagSnackbar"
      bottom
      right
      color="blue white--text"
      :timeout="timeout"
    >
      {{ tag }}
      <v-btn
        color="red"
        flat
        @click="changePage({page: 'articles', state: 'all'})"
      >
        Back
      </v-btn>
    </v-snackbar>
  </v-layout> 
</template>
<script>
import axios from 'axios'
import ArticlesList from './ArticlesList.vue'
import FormArticle from './FormArticle.vue'
import Sidenav from './Sidenav.vue'
import Profile from './Profile.vue'
import EditArticle from './EditArticle.vue'
import DisplayArticle from './DisplayArticle.vue'
export default {
  props: ['loggedUser'],
  data() {
    return {
      tagSnackbar: false,
      tag: '',
      timeout: 0,
      searchInput : '',
      page: 'articles',
      state: 'all',
      selectedArticle: '',
      articles: [],
    }
  },
  components : {
    Sidenav,
    ArticlesList,
    FormArticle,
    Profile,
    EditArticle,
    DisplayArticle
  },
  methods : {
    changePage(input) {
      this.tagSnackbar = false
      if(input.page == 'edit' || input.page == 'display') {
        this.$vuetify.goTo(0)
        this.page = input.page
        this.selectedArticle = input.data
      }
        console.log(input)
        this.page = input.page
      if(input.state == 'all') {
        this.state = input.state
        axios({
          url: 'http://localhost:3000/api/articles',
          method: 'GET'
        })
        .then(({data}) => {
          this.articles = data
        })
        .then(err => {
          console.log(err)
        })
      } else if(input.state == 'my') {
        this.state = input.state
        axios({ 
          method: 'GET',
          url: `http://localhost:3000/api/articles/user`,
          headers: {
            'token': localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          this.articles = data
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
      }
    },
    updateProfile(payload) {
      this.$emit('updateProfile', payload)
    },
    getByTag(tag) {
      this.page = 'articles'
      this.state = 'all'
      this.articles = this.articles.filter(article => article.tags.includes(tag))
      this.tagSnackbar = true
      this.tag = `Filter Result for : ${tag}`
    }
  },
  mounted() {
    axios({
      method: 'GET',
      url: `http://localhost:3000/api/articles`
    })
    .then(({data}) => {
      this.articles = data
    })
  },
  computed : {
    filteredList() {
      return this.articles.filter(article => {
        return article.title.toLowerCase().includes(this.searchInput.toLowerCase())
      })
    }
  }
}
</script>

<style lang="scss" scoped>

#inside {
  // display: flex;
  margin: 15px;
  margin-top: 90px;
  width: 100%;
  height: 100%;
}

#content-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  // overflow-y: auto;
  // height: 100%;
  // border: 2px solid black;
  // height: 100%;
  // margin-left: 20px;
}

#content {
  // border: 2px solid black;
  height: 100%;
  // overflow-y: auto;
}
</style>
