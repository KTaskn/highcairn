import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import Viewer from '../components/viewer'

const Edit: React.FC = () => {
  const [content, setContent] = React.useState('');
  const contentChange = (event) => {
    setContent(event.target.value)
  }
  const [title, setTitle] = React.useState('');
  const titleChange = (event) => {
    setTitle(event.target.value)
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
            <Button>
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