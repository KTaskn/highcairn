import * as MarkdownIt from 'markdown-it'
import styled from 'styled-components';
import mk from 'markdown-it-katex'
import 'katex/dist/katex.min.css'

const md = new MarkdownIt()
md.use(mk)

const ViewwerStyle = styled.div`
  & h1 {
    text-decoration: underline;
  }
`

const Viewer: React.FC<{markdown_text: string}> = ({markdown_text}) => {
  let html: string = md.render(markdown_text)
  return (
    <ViewwerStyle className="viewer" dangerouslySetInnerHTML={{__html: html}}></ViewwerStyle>
  )
}

export default Viewer