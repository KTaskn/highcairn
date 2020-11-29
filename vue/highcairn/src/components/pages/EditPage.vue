<template>
  <div>
    <!-- タイトル -->
    <vs-row vs-w="12">
      <vs-col vs-justify="center" vs-align="center">
        <vs-input v-model="title" class="widthfull"/>
      </vs-col>
    </vs-row>

    <!-- コンテンツ -->
    <vs-row vs-w="12">
      <vs-col class="middle-component" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="6" vs-xs="12">
        <Editor @edit="edit"/>
      </vs-col>
      <vs-col class="middle-component"  vs-justify="center" vs-align="center" vs-lg="6" vs-sm="6" vs-xs="12">
        <Previewer :input_content="content"/>
      </vs-col>
    </vs-row>

    <!-- ボタン -->
    <vs-row vs-w="12">
      <vs-col vs-justify="center" vs-align="center" vs-offset="8">
        <div class="examplex">
          <vs-dropdown>
            <vs-button type="filled">Save</vs-button>
            <vs-dropdown-menu>
              <vs-dropdown-item>
                Draft
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-col>
    </vs-row>
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
      title: "",
      content: ""
    }
  },
  methods: {
    edit: function(content) {
      this.content = content
    }
  }
}
</script>

<style scoped>
.widthfull {
  width: 100%;
}
.examplex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.middle-component{
  height: 80vh;
  position: relative;
}
</style>