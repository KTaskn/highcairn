export default class ImageUpload {
    id: string
    content_base64: string

    constructor(init?: Partial<ImageUpload>) {
        Object.assign(this, init)
    }
}