import React from 'react'
import FetchWrapper from '../utilities/fetchwrapper'
import EditComponent from '../components/edit'
import AuthComponent from '../components/auth'
import Post from '../models/post'

class LocalEditComponent extends EditComponent {
  private jumpTopPage = () => {
    document.location.href = '/'
  }

  protected clickFunction(title, content) {    
    FetchWrapper.post<Post, Post>('/api/posts/', new Post({title: title, content: content})).then((res) => {
      this.jumpTopPage()
    }).catch((error) => {
      console.log(error)
    })
  }
}

interface Props {
  cookie?: any
}

class Edit extends React.Component<Props> {
  render() {
    let obj = new LocalEditComponent()
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