import React from 'react'
import EditComponent from '../components/edit'
import AuthComponent from '../components/auth'
import Post from '../models/post'

interface Props {
  cookie?: any
}

class Edit extends React.Component<Props> {
  render() {
    let obj = new EditComponent(new Post({title: "", content: "", id: null, public: false}))
    let FC = obj.rendering
    return <AuthComponent cookie={this.props.cookie} FC={FC} />
  }

  public static async getInitialProps({ req }) {
    return {
        cookie: req.headers.cookie
    }
  }
}

export default Edit