import TabFunction from '../../utilities/tabfunction'

let tabFunction = new TabFunction(4)
const shiftTab = tabFunction.shiftTab
const unshiftTab = tabFunction.unshiftTab

// shiftTab
test('test shiftTab position 0', async () => {
    let input: string = `春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`
    let expect_value: string = `    春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`    
    expect(shiftTab(input, 0)).toEqual(expect_value)
})

test('test shiftTab position 1', async () => {
    let input: string = `春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`
    let expect_value: string = `    春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`    
    expect(shiftTab(input, 1)).toEqual(expect_value)
})

test('test shiftTab position 2', async () => {
    let input: string = `春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`
    let expect_value: string = `春はあけぼの。
    やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`    
    expect(shiftTab(input, 10)).toEqual(expect_value)
})

test('test shiftTab position 3', async () => {
    let input: string = `春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`
    let expect_value: string = `春はあけぼの。
やうやう白くなりゆく山際、
    少し明かりて、紫だちたる雲の細くたなびきたる。`    
    expect(shiftTab(input, input.length)).toEqual(expect_value)
})

test('test shiftTab position 4', async () => {
    let input: string = `春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`
    let expect_value: string = `    春はあけぼの。
    やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`

    let text = `春はあけぼの。
や`
    expect(shiftTab(input, 0, text.length)).toEqual(expect_value)
})


// unshiftTab

test('test unshiftTab position 0', async () => {
    let input: string = `    春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`    
    let expect_value: string = `春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`
    expect(unshiftTab(input, 0)).toEqual(expect_value)
})

test('test unshiftTab position 1', async () => {
    let input: string = `    春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`    
    let expect_value: string = `春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`
    expect(unshiftTab(input, 1)).toEqual(expect_value)
})

test('test unshiftTab position 2', async () => {
    let input: string = `春はあけぼの。
    やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`    
    let expect_value: string = `春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`
    expect(unshiftTab(input, 10)).toEqual(expect_value)
})

test('test unshiftTab position 3', async () => {
    let input: string = `春はあけぼの。
やうやう白くなりゆく山際、
    少し明かりて、紫だちたる雲の細くたなびきたる。`
    let expect_value: string = `春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`    
    expect(unshiftTab(input, input.length)).toEqual(expect_value)
})

test('test unshiftTabunshiftTab position 4', async () => {
    let input: string = `    春はあけぼの。
    やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`
    let expect_value: string = `春はあけぼの。
やうやう白くなりゆく山際、
少し明かりて、紫だちたる雲の細くたなびきたる。`

    let text = `    春はあけぼの。
    やうやう白くなりゆく`
    expect(unshiftTab(input, 0, text.length)).toEqual(expect_value)
})