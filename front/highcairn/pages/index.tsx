import React from 'react'
import Viewer from '../components/viewer'

const Home: React.FC = () => {
  let arg: string = "# Hello !!"
  return (
    <div>
      <Viewer markdown_text={arg} />
    </div>
  )
  }

export default Home