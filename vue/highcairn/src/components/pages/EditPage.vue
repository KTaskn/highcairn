<template>
  <div>
    <Editor @edit="edit"/>
    <Previewer :value="value"/>
  </div>
</template>

<script>
import Editor from '../parts/Editor'
import Previewer from '../parts/Previewer'
export default {
  components: {
    Editor,
    Previewer
  },
  data() {
    return {
      value: "hogehoge"
    }
  },
  methods: {
    edit: function(value) {
      this.value = value
    }
  }
}
</script>

<style scoped>
</style>
