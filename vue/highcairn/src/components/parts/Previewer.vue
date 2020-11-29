<template>
    <div>
        <div id="content" v-html="content"></div>       
    </div>
</template>
<script>
import * as MarkdownIt  from 'markdown-it'
import math from 'markdown-it-katex'
const md = new MarkdownIt()
md.use(math)

export default {
    props: ['input_content'],
    data() {
        return {
            content: ""
        }
    },
    watch: {
        input_content: function(value) {
            this.content = md.render(value)
        }
    }
}
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css';
#content {
    text-align: left;
    position: absolute;
    top:0;
    bottom:0;
    left:0;
}
</style>