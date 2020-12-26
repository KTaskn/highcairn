
import { Response } from "node-fetch"
import Cookies from 'js-cookie'
import FetchWrapper from '../utilities/fetchwrapper'
import urlparse from 'url'


// mockの設定ここから

// fetchを置き換えるmock
const fetch_mock = (input: RequestInfo, init?: RequestInit): Promise<any> => {
    return new Promise((resolve, reject) => {
        let ret = new Response(
            JSON.stringify({
                headers: init.headers,
                url: input,
                method: init.method,
                url_query: urlparse.parse(input.toString(), true).query,
                body: init.body
            }),
            {
                status: 200,
                statusText: 'ok'
            }
        )
        resolve(ret)
    })
}

// jest.mockでisomorphic-unfetchのfetchをmockする
import fetch from 'isomorphic-unfetch'
jest.mock('isomorphic-unfetch')
fetch.mockImplementation(fetch_mock)

// mockの設定ここまで

interface Dumy {
    headers?: any,
    url?: any,
    method?: any,
    url_query?: any,
    body: any
}

test('test Get Method', async () => {
    let expect_value: string = 'GET'
    let actual_value = await FetchWrapper.get<Dumy>('http://localhost/api/test/')
    expect(actual_value.bound.method).toEqual(expect_value)
})

test('test Get Header Default', async () => {
    let expect_value: any = {
        'Content-Type': 'application/json'
    }
    let actual_value = await FetchWrapper.get<Dumy>('http://localhost/api/test')
    expect(actual_value.bound.headers).toEqual(expect_value)
})

test('test Get InitializeHeader replace', async () => {
    let expect_value: any = {
        'Content-Type': 'application/form'
    }
    let input_value: any = {
        'Content-Type': 'application/form'
    }
    let actual_value = await FetchWrapper.get<Dumy>('http://localhost/api/test', input_value)
    expect(actual_value.bound.headers).toEqual(expect_value)
})

test('test Get InitializeHeader set input', async () => {
    let expect_value: any = {
        'any_header': 'header_value',
        'Content-Type': 'application/json',
    }
    let input_value: any = {
        'any_header': 'header_value'
    }
    let actual_value = await FetchWrapper.get<Dumy>('http://localhost/api/test', input_value)
    expect(actual_value.bound.headers).toEqual(expect_value)
})

test('test Get InitializeHeader set input', async () => {
    let expect_value: any = {
        'any_header': 'header_value',
        'Content-Type': 'application/form',
    }
    let input_value: any = {
        'any_header': 'header_value',
        'Content-Type': 'application/form',
    }
    let actual_value = await FetchWrapper.get<Dumy>('http://localhost/api/test', input_value)
    expect(actual_value.bound.headers).toEqual(expect_value)
})

test('test Get Url Default', async () => {
    let expect_value: string = 'http://localhost/api/test'
    let actual_value = await FetchWrapper.get<Dumy>('http://localhost/api/test')
    expect(actual_value.bound.url).toEqual(expect_value)
})

test('test Get Url Default with no protocol', async () => {
    let expect_value: string = '/api/test'
    let actual_value = await FetchWrapper.get<Dumy>('/api/test')
    expect(actual_value.bound.url).toEqual(expect_value)
})

test('test Get Url with key', async () => {
    let expect_value: string = 'http://localhost/api/test/123'
    let actual_value = await FetchWrapper.get<Dumy>('http://localhost/api/test', null, 123)
    expect(actual_value.bound.url).toEqual(expect_value)
})

test('test Get Url with key and endslash', async () => {
    let expect_value: string = 'http://localhost/api/test/123'
    let actual_value = await FetchWrapper.get<Dumy>('http://localhost/api/test/', null, 123)
    expect(actual_value.bound.url).toEqual(expect_value)
})


test('test Get With parameters', async () => {
    let params: any = {
        hoge: "fuga",
        piyo: "piyo"
    }
    let expect_value: any = params
    let actual_value = await FetchWrapper.get<Dumy>('http://example.com/api/test', {}, null, params)
    console.log(actual_value.bound.url)
    expect(actual_value.bound.url_query).toEqual(expect_value)
})

test('test Get SSR', async () => {
    process.env.BACKEND_URL = "http://example.com"
    let expect_value: string = 'http://example.com/api/test'
    let actual_value = await FetchWrapper.get4ssr<Dumy>('/api/test', {})
    expect(actual_value.bound.url).toEqual(expect_value)
})


// Post
test('test Post Method', async () => {
    let expect_value: string = 'POST'
    let actual_value = await FetchWrapper.post<any, Dumy>('http://localhost/api/test/', {})
    expect(actual_value.bound.method).toEqual(expect_value)
})

test('test Post Header Default', async () => {
    let expect_value: any = {
        'Content-Type': 'application/json'
    }
    let actual_value = await FetchWrapper.post<any, Dumy>('http://localhost/api/test/', {})
    expect(actual_value.bound.headers).toEqual(expect_value)
})

test('test Post InitializeHeader replace', async () => {
    let expect_value: any = {
        'Content-Type': 'application/form'
    }
    let input_value: any = {
        'Content-Type': 'application/form'
    }
    let actual_value = await FetchWrapper.post<any, Dumy>('http://localhost/api/test/', {}, input_value)
    expect(actual_value.bound.headers).toEqual(expect_value)
})

test('test Post InitializeHeader set input add', async () => {
    let expect_value: any = {
        'any_header': 'header_value',
        'Content-Type': 'application/json',
    }
    let input_value: any = {
        'any_header': 'header_value'
    }
    let actual_value = await FetchWrapper.post<any, Dumy>('http://localhost/api/test/', {}, input_value)
    expect(actual_value.bound.headers).toEqual(expect_value)
})

test('test Post InitializeHeader set input all replace', async () => {
    let expect_value: any = {
        'any_header': 'header_value',
        'Content-Type': 'application/form',
    }
    let input_value: any = {
        'any_header': 'header_value',
        'Content-Type': 'application/form',
    }
    let actual_value = await FetchWrapper.post<any, Dumy>('http://localhost/api/test/', {}, input_value)
    expect(actual_value.bound.headers).toEqual(expect_value)
})

test('test Post InitializeHeader set input with Cookie', async () => {
    Cookies.set('csrftoken', 'fugafuga')
    let expect_value: any = {
        'any_header': 'header_value',
        'Content-Type': 'application/form',
        'X-CSRFToken': 'fugafuga'
    }
    let input_value: any = {
        'any_header': 'header_value',
        'Content-Type': 'application/form',
    }
    let actual_value = await FetchWrapper.post<any, Dumy>('http://localhost/api/test/', {}, input_value)
    expect(actual_value.bound.headers).toEqual(expect_value)
    Cookies.remove('csrftoken')
})

test('test Post Url Default', async () => {
    let expect_value: string = 'http://localhost/api/test'
    let actual_value = await FetchWrapper.post<any, Dumy>('http://localhost/api/test', {})
    expect(actual_value.bound.url).toEqual(expect_value)
})

test('test Post Url Default with no protocol', async () => {
    let expect_value: string = '/api/test'
    let actual_value = await FetchWrapper.post<any, Dumy>('/api/test', {})
    expect(actual_value.bound.url).toEqual(expect_value)
})

test('test Post Body', async () => {
    let input_value: any = {fuga: "hoge"}
    let expect_value: any = JSON.stringify(input_value)
    let actual_value = await FetchWrapper.post<any, Dumy>('/api/test', input_value)
    expect(actual_value.bound.body).toEqual(expect_value)
})



// Put
test('test Put Method', async () => {
    let expect_value: string = 'PUT'
    let actual_value = await FetchWrapper.put<any, Dumy>('http://localhost/api/test/', 1, {})
    expect(actual_value.bound.method).toEqual(expect_value)
})

test('test Put Header Default', async () => {
    let expect_value: any = {
        'Content-Type': 'application/json'
    }
    let actual_value = await FetchWrapper.put<any, Dumy>('http://localhost/api/test/', 1, {})
    expect(actual_value.bound.headers).toEqual(expect_value)
})

test('test Put InitializeHeader replace', async () => {
    let expect_value: any = {
        'Content-Type': 'application/form'
    }
    let input_value: any = {
        'Content-Type': 'application/form'
    }
    let actual_value = await FetchWrapper.put<any, Dumy>('http://localhost/api/test/', 1, {}, input_value)
    expect(actual_value.bound.headers).toEqual(expect_value)
})

test('test Put InitializeHeader set input add', async () => {
    let expect_value: any = {
        'any_header': 'header_value',
        'Content-Type': 'application/json',
    }
    let input_value: any = {
        'any_header': 'header_value'
    }
    let actual_value = await FetchWrapper.put<any, Dumy>('http://localhost/api/test/', 1, {}, input_value)
    expect(actual_value.bound.headers).toEqual(expect_value)
})

test('test Put InitializeHeader set input all replace', async () => {
    let expect_value: any = {
        'any_header': 'header_value',
        'Content-Type': 'application/form',
    }
    let input_value: any = {
        'any_header': 'header_value',
        'Content-Type': 'application/form',
    }
    let actual_value = await FetchWrapper.put<any, Dumy>('http://localhost/api/test/', 1, {}, input_value)
    expect(actual_value.bound.headers).toEqual(expect_value)
})

test('test Post InitializeHeader set input with Cookie', async () => {
    Cookies.set('csrftoken', 'fugafuga')
    let expect_value: any = {
        'any_header': 'header_value',
        'Content-Type': 'application/form',
        'X-CSRFToken': 'fugafuga'
    }
    let input_value: any = {
        'any_header': 'header_value',
        'Content-Type': 'application/form',
    }
    let actual_value = await FetchWrapper.put<any, Dumy>('http://localhost/api/test/', 1, {}, input_value)
    expect(actual_value.bound.headers).toEqual(expect_value)
    Cookies.remove('csrftoken')
})

test('test Post Url Default', async () => {
    let expect_value: string = 'http://localhost/api/test/1'
    let actual_value = await FetchWrapper.put<any, Dumy>('http://localhost/api/test/', 1, {})
    expect(actual_value.bound.url).toEqual(expect_value)
})

test('test Post Url Default with no protocol', async () => {
    let expect_value: string = '/api/test/1'
    let actual_value = await FetchWrapper.put<any, Dumy>('/api/test/', 1, {})
    expect(actual_value.bound.url).toEqual(expect_value)
})

test('test Put Body', async () => {
    let input_value: any = {fuga: "hoge"}
    let expect_value: any = JSON.stringify(input_value)
    let actual_value = await FetchWrapper.put<any, Dumy>('/api/test', 1, input_value)
    expect(actual_value.bound.body).toEqual(expect_value)
})