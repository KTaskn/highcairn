import React from 'react'
import { NextPage } from 'next'
import Router from 'next/router'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import Viewer from '../components/viewer'

import Post from '../models/post'
import FetchWrapper from '../utilities/fetchwrapper'
import { truncate } from 'fs'

interface Props {
  result: boolean 
}

const Edit: NextPage<Props> = ({ result }) => {
  const jumpTopPage = () => {
    Router.push('/')
  }
  const [content, setContent] = React.useState('');
  const contentChange = (event) => {
    setContent(event.target.value)
  }
  const [title, setTitle] = React.useState('');
  const titleChange = (event) => {
    setTitle(event.target.value)
  }
  const uploadPost = () => {
    FetchWrapper.post<Post, Post>('/api/posts/', new Post({title: title, content: content})).then((res) => {
      jumpTopPage()
    }).catch((error) => {
      console.log(error)
    })
  }

  if (result) {
    return (<div>
      <Grid container spacing={2}>
          <Grid item xs={11}>
            <TextField
              id="headline"
              value={title}
              onChange={titleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <Button onClick={uploadPost}>
              Submit
              <EditIcon />
            </Button>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="contents"
              multiline
              rows={25}
              rowsMax={25}
              value={content}
              onChange={contentChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Viewer content={content} />
          </Grid>
      </Grid>
    </div>)
  } else {
    return <div>no auth</div>
  }
}

Edit.getInitialProps = async ({ req }) => {
  const checkSession = async (): Promise<Props> => {
    return await FetchWrapper.get4ssr<Props>('/api/check/', {
      'Content-Type': 'application/json',
      'cookie': req.headers.cookie
    }).then((response) => {
      if (response.raw.ok) {
        return {
          result: true
        }
      } else {
        return {
          result: false
        }
      }
    }).catch((error) => {
      console.log(error)
      return {
        result: false
      }
    })
  }
  return await checkSession()
}

export default Edit