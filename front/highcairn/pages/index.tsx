import React from 'react'
import Viewer from '../components/viewer'
import Grid from '@material-ui/core/Grid'

import FetchWrapper from '../utilities/fetchwrapper'
import Post from '../models/post'

interface Props {
  posts?: Post[]
}

class Home extends React.Component<Props> {
  static async getInitialProps(ctx) {
    try {
      let posts = await FetchWrapper.get4ssr<Post[]>('/api/posts/')
      return { posts: posts.bound }
    } catch(ex) {
      return { posts: [] }
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

export default Home