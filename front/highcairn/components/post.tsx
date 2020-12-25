import React from 'react'
import PostModel from '../models/post'
import Viewer from '../components/viewer'
import style from '../styles/components/Post.module.scss'

interface Props {
    postmodel: PostModel
}

const Post: React.FC<Props> = (props) => (
    <div>
        <h1 className={style.title}><a href={`/post/${props.postmodel.id}`}>{props.postmodel.title}</a></h1>
        <Viewer content={props.postmodel.content}/>
    </div>
)

export default Post