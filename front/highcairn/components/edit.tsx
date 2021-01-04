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

const NUM_SPACES = 4
const SLEEP_TIMER = 60 * 1000

class Edit {
  private post: Post
  
  protected sleeptime_timer
  private auto_save_flag

  constructor(post: Post) {
    this.post = post
    this.sleeptime_timer = SLEEP_TIMER
  }

  protected timerFunction() {
    if (this.auto_save_flag) {
      this.save(this.post).then((response) => {
        this.post = response.bound
        console.log("auto save")
      }).catch((error) => {
        console.log("auto save error")
      })
    }
  }

  private save(post: Post): Promise<Response<Post>> {
    if (post && post.id) {
      return FetchWrapper.put<Post, Post>('/api/posts/', post.id, post)
    } else {
      return FetchWrapper.post<Post, Post>('/api/posts/', post)
    }
  }

  private delete(post: Post): Promise<Response<Post>> {
    if (post && post.id) {
      return FetchWrapper.delete<Post>('/api/posts/', post.id)
    } else {
      return new Promise((resolve, reject) => {
        reject("ERROR")
      })
    }
  }

  private startAutoSave() {
    this.auto_save_flag = true
  }
  private stopAutoSave() {
    this.auto_save_flag = false
  }
  
  protected clickSubmit(post: Post) {
    // 自動セーブと重なるといやなのでさきに停止する
    this.stopAutoSave()
    post.public = true
    this.save(post).then(() => {
      this.jumpTopPage()
    }).catch(() => {
      console.log("submit error")
    })
  }

  protected clickSave(post: Post) {
    this.stopAutoSave()
    post.public = false
    this.save(post).then(() => {
      this.jumpTopPage()
    }).catch(() => {
      console.log("save error")
    })
  }

  protected clickDelete(post: Post) {  
    this.stopAutoSave()
    this.delete(post).then(() => {
      this.jumpTopPage()
    }).catch(() => {
      console.log("delete error")
    })
  }

  private jumpTopPage = () => {
    document.location.href = '/'
  }

  public rendering: React.FC = () => {
    const contentRef = React.useRef()

    const [title, setTitle] = React.useState(this.post.title)
    const [content, setContent] = React.useState(this.post.content)
    const titleChange = (event) => {
      this.post.title = event.target.value
      setTitle(event.target.value)
    }
    const contentChange = (event) => {
      this.post.content = event.target.value
      setContent(event.target.value)
    }
    const [time, updateTime] = React.useState(Date.now())

    React.useEffect(() => {
      this.startAutoSave()
      const timeoutId = setTimeout(
        () => updateTime(Date.now()),
        this.sleeptime_timer
      )
      return () => {
          clearTimeout(timeoutId)
          this.timerFunction()
      }
    }, [time])

    const tabFunction = function(event) {
      if (((event.ctrlKey && !event.metaKey) || (!event.ctrlKey && event.metaKey)) && event.key === ']') {
        event.preventDefault()

        // ' '.repeat(NUM_SPACES)
        let obj = contentRef.current
        // 現在のカーソルの位置と、カーソルの左右の文字列を取得しておく
        let cursorPosition: number = obj.selectionStart
        let cursorLeft: string = obj.value.substr(0, cursorPosition)
        let cursorRight: string = obj.value.substr(cursorPosition, obj.value.length)

        let matches: RegExpMatchArray = cursorLeft.match(/^[^]+\n/)
        if (matches) {
          let match: string = matches[0]
          let first: string = cursorLeft.substr(0, match.length)
          let second: string = cursorLeft.substr(match.length)
          obj.value = first + ' '.repeat(NUM_SPACES) + second + cursorRight
          obj.selectionEnd = (first + ' '.repeat(NUM_SPACES) + second).length
        }
      }


      if (((event.ctrlKey && !event.metaKey) || (!event.ctrlKey && event.metaKey)) && event.key === '[') {
        event.preventDefault()

        // ' '.repeat(NUM_SPACES)
        let obj = contentRef.current
        // 現在のカーソルの位置と、カーソルの左右の文字列を取得しておく
        let cursorPosition: number = obj.selectionStart
        let cursorLeft: string = obj.value.substr(0, cursorPosition)
        let cursorRight: string = obj.value.substr(cursorPosition, obj.value.length)

        let matches: RegExpMatchArray = cursorLeft.match(/^[^]+\n/)
        if (matches) {
          let match: string = matches[0]
          let first: string = cursorLeft.substr(0, match.length)
          let second: string = cursorLeft.substr(match.length)
          second = second.replace(/\s\s\s\s/, '')
          obj.value = first + second + cursorRight
          obj.selectionEnd = (first + second).length
        }
      }
    }

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
              inputRef={contentRef}
              onChange={contentChange}
              onKeyDown={(event) => {
                tabFunction(event)
              }}
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