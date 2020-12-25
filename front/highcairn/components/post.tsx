import React from 'react'
import PostModel from '../models/post'
import Viewer from '../components/viewer'

interface Props {
    postmodel: PostModel
}

const Post: React.FC<Props> = (props) => (
    <div>
        <h1>{props.postmodel.title}</h1>
        <Viewer content={props.postmodel.content}/>
    </div>
)

export default Post