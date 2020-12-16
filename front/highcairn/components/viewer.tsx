import * as MarkdownIt from 'markdown-it'
import mk from 'markdown-it-katex'
import styles from 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css'

const md = new MarkdownIt()
md.use(mk)

const Viewer: React.FC<{markdown_text: string}> = ({markdown_text}) => {
  let html: string = md.render(markdown_text)
  return (
    <div dangerouslySetInnerHTML={{__html: html}}></div>
  )
}

export default Viewer