
export default class Post {
    id: number
    title: string
    content: string

    constructor(init?: Partial<Post>) {
        Object.assign(this, init)
    }
}