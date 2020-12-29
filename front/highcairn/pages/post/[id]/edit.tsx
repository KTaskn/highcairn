import React from 'react'
import FetchWrapper from '../../../utilities/fetchwrapper'
import EditComponent from '../../../components/edit'
import AuthComponent from '../../../components/auth'
import Post from '../../../models/post'

interface Props {
  cookie?: any,
  post_id: number,
  post: Post
}

class Edit extends React.Component<Props> {
  render() {
    let obj = new EditComponent(this.props.post)
    let FC = obj.rendering
    return <AuthComponent cookie={this.props.cookie} FC={FC} />
  }

  public static async getInitialProps({ req, query }) {
    let response = await FetchWrapper.get4ssr<Post>('/api/posts/', {
      'cookie': req.headers.cookie
    }, query.id)
    let post: Post
    if (response.raw.ok) {
      post = response.bound

      return {
        cookie: req.headers.cookie,
        post: post
      }
    } else {
      return {
        cookie: req.headers.cookie,
        post: new Post({title: "", content: "", id: null, public: false})
      }
    }

  }
}

export default Edit