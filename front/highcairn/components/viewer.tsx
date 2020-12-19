import * as MarkdownIt from 'markdown-it'
import mk from 'markdown-it-katex'
import 'katex/dist/katex.min.css'

import style from '../styles/components/Viewer.module.scss'

const md = new MarkdownIt()
md.use(mk)

const Viewer: React.FC<{content: string}> = ({content}) => {
  let html: string = md.render(content)
  return (
    <div className={style.viewer} dangerouslySetInnerHTML={{__html: html}}></div>
  )
}

export default Viewer