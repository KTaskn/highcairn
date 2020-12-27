
export default class Post {
    id: number
    title: string
    content: string
    created_at: Date
    updated_at: Date

    constructor(init?: Partial<Post>) {
        Object.assign(this, init)
    }
}