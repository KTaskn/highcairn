import * as MarkdownIt from 'markdown-it'
import mk from 'markdown-it-katex'
import 'katex/dist/katex.min.css'

const md = new MarkdownIt()
md.use(mk)

const Viewer: React.FC<{markdown_text: string}> = ({markdown_text}) => {
  let html: string = md.render(markdown_text)
  return (
    <div dangerouslySetInnerHTML={{__html: html}}></div>
  )
}

export default Viewer