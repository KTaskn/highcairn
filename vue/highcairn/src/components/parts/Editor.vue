<template>
  <div>
    <vs-textarea v-model="value" height="80%"/>
  </div>
</template>
<script>
export default {
    data: () => {
      return {
        value: ""
      }
    },
    methods: {
    },
    watch: {
      value: function(changed) {
        this.$emit('edit', changed)
      }
    }
}
</script>
<style scoped>

</style>