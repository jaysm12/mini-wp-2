<template>
  <v-card id="display-article">
    <h1 id="title">{{article.title}}</h1>
    <v-layout column>
      <v-flex >
        <v-img :src="article.image">
        </v-img>
      </v-flex>
      <v-divider></v-divider>
      <v-flex >
        <div v-html="article.content"></div>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <div id="footer">
      <p style="margin: 0;">Creator : {{article.user.username}}</p>
      <div id="tag-container"> 
        <TagChip v-for="tag in article.tags" :key="tag" :tag="tag" @getByTag="getByTag"></TagChip>
      </div>
    </div>
  </v-card>
</template>
<script>
import TagChip from './TagsChip.vue'
export default {
  name: 'displayArticle',
  props: ['article'],
  data() {
    return {

    }
  },
  components : {
    TagChip
  }
}
</script>

<style scoped>
  #display-article {
    padding: 2em;
  }
  #title {
    text-align: center;
    margin-bottom: 1em;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.39)
  }
  #footer {
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
  }
  #tag-container {
    display: flex;
  }
</style>

