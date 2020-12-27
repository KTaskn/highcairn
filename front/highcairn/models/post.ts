
export default class Post {
    id: number
    title: string
    content: string
    created_at: Date
    updated_at: Date
    public: boolean

    constructor(init?: Partial<Post>) {
        if (!init.public) {
            init.public = false
        }
        Object.assign(this, init)
    }
}