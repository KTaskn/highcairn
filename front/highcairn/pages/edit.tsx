import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Viewer from '../components/viewer'

const Edit: React.FC = () => {
  const [content, setContent] = React.useState('');
  const contentChange = (event) => {
    setContent(event.target.value)
  }
  const [headline, setHeadline] = React.useState('');
  const headlineChange = (event) => {
    setHeadline(event.target.value)
  }
  return (
    <div>
      <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="headline"
              value={headline}
              onChange={headlineChange}
              variant="outlined"
              fullWidth
            />
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