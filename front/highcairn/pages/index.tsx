import React from 'react'
import Viewer from '../components/viewer'

import Fetch from '../utilities/fetch'
import Post from '../models/post'

class Props {
  posts: Post[]
}

export default class Home extends React.Component {

  static async getInitialProps(ctx): Promise<Props> {
    try {
      let posts: Post[] = await Fetch.get<Post[]>('/api/posts/', null, true)

      return {
        posts: posts
      }
    } catch(ex) {
      return {
        posts: []
      }
    }
  }

  render() {
    return (
      <div>
        { this.props.posts.map((a_post) => (
          <div>
            <h1>{a_post.title}</h1>
            <Viewer content={a_post.content}/>
          </div>
        )) }
      </div>
    )
  }
}