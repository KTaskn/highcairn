import React from 'react'
import Grid from '@material-ui/core/Grid'
import FetchWrapper from '../../../utilities/fetchwrapper'
import PostModel from '../../../models/post'
import PostComponent from '../../../components/post'

interface Props {
  postmodel?: PostModel
}

class Post extends React.Component<Props> {
  static async getInitialProps({query}) {
    try {
      let response = await FetchWrapper.get4ssr<PostModel>('/api/posts/', null, query.id)
      if (response.raw.ok) {
        return { postmodel: response.bound }
      } else {
        return { postmodel: null }
      }
    } catch(ex) {
      return { postmodel: null }
    }
  }

  render() {
    if (this.props.postmodel) {
      return (        
        <div>
          <Grid container spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              <PostComponent postmodel={this.props.postmodel} />
            </Grid>
          </Grid>
        </div>
      )      
    } else {
      return <p>データがありません</p>
    }
  }
}

export default Post