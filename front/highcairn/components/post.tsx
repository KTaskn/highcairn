import React from 'react'
import PostModel from '../models/post'
import Viewer from '../components/viewer'
import style from '../styles/components/Post.module.scss'

interface Props {
    postmodel: PostModel
}

const Post: React.FC<Props> = (props) => (
    <div className={style.post} >
        <h1><a href={`/post/${props.postmodel.id}`}>{props.postmodel.title}</a></h1>
        <Viewer content={props.postmodel.content}/>
    </div>
)

export default Post