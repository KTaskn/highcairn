import React from 'react'
import Head from 'next/head'
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
      let response = await FetchWrapper.get4ssr<PostModel>('/api/publicposts/', null, query.id)
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
      let site_url: string = process.env.SITE_URL + "/post/" + this.props.postmodel.id + "/"
      let ogp_url: string = process.env.SITE_URL + "/api/ogp/" + this.props.postmodel.id + "/"
      return (       
        <div> 
          <Head>
            <meta name="twitter:card" content="summary" />
            <meta property="og:url" content={ site_url } />
            <meta property="og:title" content={ this.props.postmodel.title } />
            <meta property="og:description" content={ this.props.postmodel.title } />
            <meta property="og:image" content={ ogp_url } />
          </Head>
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