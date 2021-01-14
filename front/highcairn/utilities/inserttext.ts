export default class InsertText {
    public insert(input: string, insert_text: string, position: number): string {
        let head: string = input.substr(0, position)
        let tail: string = input.substr(position, input.length)

        return head + insert_text + tail
    }
}