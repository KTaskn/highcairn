import { insertTab } from '../../utilities/tabfunction'

test('test TabFunction position 0', async () => {
    let input: string = `春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`
    let expect_value: string = `    春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`    
    expect(insertTab(input, 0)).toEqual(expect_value)
})

test('test TabFunction position 1', async () => {
    let input: string = `春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`
    let expect_value: string = `    春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`    
    expect(insertTab(input, 1)).toEqual(expect_value)
})

test('test TabFunction position 2', async () => {
    let input: string = `春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`
    let expect_value: string = `春はあけぼの。
    やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`    
    expect(insertTab(input, 10)).toEqual(expect_value)
})

test('test TabFunction position 3', async () => {
    let input: string = `春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`
    let expect_value: string = `春はあけぼの。
やうやう白くなりゆく山際、
    少し明かりて、紫だちたる雲の細くたなびきたる。`    
    expect(insertTab(input, input.length)).toEqual(expect_value)
})

test('test TabFunction position 4', async () => {
    let input: string = `春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`
    let expect_value: string = `    春はあけぼの。
    やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`

    let text = `春はあけぼの。
や`
    expect(insertTab(input, 0, text.length)).toEqual(expect_value)
})
