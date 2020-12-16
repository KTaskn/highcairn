import React from 'react'
import TextField from '@material-ui/core/TextField'
import Viewer from '../components/viewer'

const Edit: React.FC = () => {
  const [text, setText] = React.useState('');
  const handleChange = (event) => {
    setText(event.target.value)
  }
  return (
    <div>
        <TextField
          id="outlined-multiline-static"
          label="Editor"
          multiline
          rows={25}
          value={text}
          onChange={handleChange}
          variant="outlined"
        />
        <Viewer markdown_text={text} />
    </div>
  )
  }

export default Edit