import * as MarkdownIt from 'markdown-it'
import mk from 'markdown-it-katex'
import hljs from 'highlight.js'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/hopscotch.css'

import style from '../styles/components/Viewer.module.scss'

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }

    return ''
  }
})
md.use(mk)

const Viewer: React.FC<{content: string}> = ({content}) => {
  let html: string = md.render(content)
  return (
    <div className={style.viewer} dangerouslySetInnerHTML={{__html: html}}></div>
  )
}

export default Viewer