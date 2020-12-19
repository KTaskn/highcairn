
export default class Post {
    title: string
    content: string

    constructor(init?: Partial<Post>) {
        Object.assign(this, init)
    }
}