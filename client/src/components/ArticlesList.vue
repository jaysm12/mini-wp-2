<template>
  <div id="myarticle-content">
    <ArticleCard :state="state" v-for="article in articles" :key="article._id" 
      :article="article" 
      @refresh="refresh"
      @getByTag="getByTag"
    ></ArticleCard>
  </div>
</template>

<script>
import ArticleCard from './ArticleCard'
import axios from 'axios'
export default {
  name: 'articlesList',
  props : ['state', 'articles'],
  data () {
    return {

    }
  },
  methods: {
    refresh(payload) {
      this.$emit('refresh', payload)
    },
    getByTag(tag) {
      this.$emit('getByTag', tag)
    }
  },
  components : {
    ArticleCard
  }
}
</script>

<style scoped>
  #myarticle-content {
    overflow-y: auto;
    height: 100%;
  }
</style>
