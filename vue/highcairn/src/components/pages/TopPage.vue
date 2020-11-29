<template>
    <div>
        <Article 
            :key="article.id" 
            v-for="article in articles"
            :title="article.title" 
            :content="article.content"/>
    </div>
</template>

<script>
import Article from '../parts/Article.vue'
export default {
  components: {
    Article
  },
  data: () => {
      return {
          articles: [
              {
                  id: 1,
                  title: "Hello1",
                  content: "world1"
              },
              {
                  id: 1,
                  title: "Hello1",
                  content: "world1"
              }
          ]
      }
  }
}
</script>

<style scoped>
</style>
