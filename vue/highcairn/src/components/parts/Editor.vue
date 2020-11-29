<template>
  <div>
    <textarea id="content" v-model="content" class="widthfull"/>
  </div>
</template>
<script>
export default {
    data: () => {
      return {
        content: ""
      }
    },
    methods: {
    },
    watch: {
      content: function(changed) {
        this.$emit('edit', changed)
      }
    }
}
</script>
<style scoped>
.widthfull {
  width: 100%;
}
#content {
  resize: none;
  position: absolute;
  top:0;
  bottom:0;
  left:0;
}
</style>