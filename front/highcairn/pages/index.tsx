import React from 'react'
import Viewer from '../components/viewer'
import Grid from '@material-ui/core/Grid'

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
        <Grid container spacing={2}>
          <Grid item xs={1}></Grid>
          <Grid item xs={11}>
            { this.props.posts.map((a_post, idx) => (
              <div key={idx}>
                <h1>{a_post.title}</h1>
                <Viewer content={a_post.content}/>
              </div>
            )) }
          </Grid>
        </Grid>
      </div>
    )
  }
}