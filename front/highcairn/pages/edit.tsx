import React from 'react'
import Router from 'next/router'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import Viewer from '../components/viewer'

import Post from '../models/post'
import Fetch from '../utilities/fetch'

const Edit: React.FC = () => {
  const [content, setContent] = React.useState('');
  const contentChange = (event) => {
    setContent(event.target.value)
  }
  const [title, setTitle] = React.useState('');
  const titleChange = (event) => {
    setTitle(event.target.value)
  }

  const jumpTopPage = () => {
    Router.push('/')
  }

  const uploadPost = () => {
    Fetch.post<Post>('/api/posts/', new Post({title: title, content: content})).then((res) => {
      jumpTopPage()
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
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
            <Viewer markdown_text={content} />
          </Grid>
      </Grid>
    </div>
  )
  }

export default Edit