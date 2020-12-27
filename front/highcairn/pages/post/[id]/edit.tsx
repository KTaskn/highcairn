import React from 'react'
import FetchWrapper from '../../../utilities/fetchwrapper'
import EditComponent from '../../../components/edit'
import AuthComponent from '../../../components/auth'
import Post from '../../../models/post'

class LocalEditComponent extends EditComponent {
  public post_id: number

  constructor(post_id: number) {
    super()
    this.post_id = post_id
  }

  private jumpTopPage = () => {
    document.location.href = '/'
  }

  protected clickFunction(title, content) {    
    FetchWrapper.put<Post, Post>('/api/posts/', this.post_id, new Post({title: title, content: content})).then((res) => {
      this.jumpTopPage()
    }).catch((error) => {
      console.log(error)
    })
  }
}

interface Props {
  cookie?: any,
  post_id: number
}

class Edit extends React.Component<Props> {
  render() {
    let obj = new LocalEditComponent(this.props.post_id)
    let FC = obj.rendering
    return <AuthComponent cookie={this.props.cookie} FC={FC} />
  }

  public static async getInitialProps({ req, query }) {
    return {
        cookie: req.headers.cookie,
        post_id: query.id
    }
  }
}

export default Edit