import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

import Viewer from '../components/viewer'
import FetchWrapper, { Response } from '../utilities/fetchwrapper'
import Post from '../models/post'

interface EditProps {
  init_content: string,
  init_title: string
}

interface SubmitButtonProps {
  submitFunction: () => void,
  saveFunction: () => void,
  deleteFunction: () => void,
}

class Edit {
  private post: Post
  
  protected sleeptime_timer

  constructor(post: Post) {
    this.post = post
    this.sleeptime_timer = 10 * 1000
  }

  protected timerFunction() {
    this.save(this.post).then((response) => {
      this.post = response.bound
      console.log("auto save")
    }).catch((error) => {
      console.log("auto save error")
    })
  }

  private executeTimerFunction() {
    setTimeout(
      () => {
        this.executeTimerFunction()
      }, this.sleeptime_timer)
    this.timerFunction()
  }

  private save(post: Post): Promise<Response<Post>> {
    if (post && post.id) {
      return FetchWrapper.put<Post, Post>('/api/posts/', post.id, post)
    } else {
      return FetchWrapper.post<Post, Post>('/api/posts/', post)
    }
  }
  
  protected clickSubmit(post: Post) {
    post.public = true
    this.save(post).then(() => {
      this.jumpTopPage()
    }).catch(() => {
      console.log("submit error")
    })
  }

  protected clickSave(post: Post) {
    post.public = false
    this.save(post).then(() => {
      this.jumpTopPage()
    }).catch(() => {
      console.log("save error")
    })
  }

  protected clickDelete(post: Post) {    
    this.jumpTopPage()
  }

  private jumpTopPage = () => {
    document.location.href = '/'
  }

  public rendering: React.FC = () => {
    console.log(this.post)
    const [title, setTitle] = React.useState(this.post.title)
    const [content, setContent] = React.useState(this.post.content)
    const titleChange = (event) => {
      setTitle(event.target.value)
      this.post.title = title
    }
    const contentChange = (event) => {
      setContent(event.target.value)
      this.post.content = content
    }

    this.executeTimerFunction()

    return (<div>
      <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              id="headline"
              value={title}
              onChange={titleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <Edit.SubmitButton submitFunction={() => {
              this.clickSubmit(this.post)
            }}
            saveFunction={() => {
              this.clickSave(this.post)
            }}
            deleteFunction={() => {
              this.clickDelete(this.post)
              }} />
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


  private static SubmitButton: React.FC<SubmitButtonProps> = ({submitFunction, saveFunction, deleteFunction}) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null)
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    }
    const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
      if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
        return;
      }  
      setOpen(false);
    }
    return (<div>
    <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
      <Button onClick={submitFunction}>Submit</Button>
      <Button color="primary" size="small" onClick={handleToggle}>
        <ArrowDropDownIcon />
      </Button>
    </ButtonGroup>
    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
    {({ TransitionProps, placement }) => (
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList id="split-button-menu">
                <MenuItem onClick={saveFunction}>Save</MenuItem>
                <MenuItem onClick={deleteFunction}>Delete</MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
    )}
  </Popper></div>)
  }
}

export default Edit