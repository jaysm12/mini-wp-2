<template>
  <div class="tag-item">
    <v-chip 
      color="blue white--text"
      hover
      @click="getByTag(tag)"
    > {{tag}}</v-chip>
  </div>
</template>

<script>
export default {
  name: 'TagChip',
  props: ['tag'],
  methods : {
    getByTag(tag) {
      this.$emit('getByTag', tag)
    }
  }
}
</script>

<style scoped>
  .tag-item:hover {
    cursor: pointer;
  }
</style>
