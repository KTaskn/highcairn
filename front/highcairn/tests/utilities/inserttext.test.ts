import InsertText from '../../utilities/inserttext'

let insertText = new InsertText()

test('test insert position 0', async () => {
    let input: string = `春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`

    let text: string = '挿入'

    let expect_value: string = `挿入春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`    
    expect(insertText.insert(input, text, 0)).toEqual(expect_value)
})

test('test insert position 1', async () => {
    let input: string = `春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`

    let text: string = '挿入'

    let expect_value: string = `春挿入はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`    
    expect(insertText.insert(input, text, 1)).toEqual(expect_value)
})