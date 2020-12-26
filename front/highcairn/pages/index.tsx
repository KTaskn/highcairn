import React from 'react'
import Grid from '@material-ui/core/Grid'

import FetchWrapper from '../utilities/fetchwrapper'
import PostModel from '../models/post'
import PostComponent from '../components/post'

interface Props {
  posts?: PostModel[]
}

class Home extends React.Component<Props> {
  static async getInitialProps(ctx) {
    try {
      let posts = await FetchWrapper.get4ssr<PostModel[]>('/api/posts/', null, null, {ordering: "-id"})
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
              <PostComponent key={idx} postmodel={a_post}/>
            )) }
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Home