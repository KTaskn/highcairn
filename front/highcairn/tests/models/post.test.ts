import PostModel from '../../models/post'

test('test constructor', async () => {
    let expect_value: boolean = false
    let model = new PostModel({title: "test title", content: "test content"})
    let actual_value: boolean = model.public
    expect(actual_value).toEqual(expect_value)
})