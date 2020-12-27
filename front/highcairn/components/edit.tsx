import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import Viewer from '../components/viewer'

interface EditProps {
  init_content: string,
  init_title: string
}

class Edit {
  private init_content: string
  private init_title: string
  
  constructor(init_content: string, init_title: string) {
    this.init_content = init_content
    this.init_title = init_title
  }

  protected clickFunction(title, content) {
  }

  public rendering: React.FC = () => {
    const [content, setContent] = React.useState(this.init_content)
    const contentChange = (event) => {
      setContent(event.target.value)
    }
    const [title, setTitle] = React.useState(this.init_title)
    const titleChange = (event) => {
      setTitle(event.target.value)
    }

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
              <Button onClick={
                () => {
                  this.clickFunction(title, content)
                }
              }>
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
  }
}

export default Edit