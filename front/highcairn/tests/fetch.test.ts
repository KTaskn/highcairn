jest.mock('isomorphic-unfetch')
import fetch from 'isomorphic-unfetch'
import Fetch from '../utilities/fetch'

const mock = (input: RequestInfo, init?: RequestInit): Promise<any> => {
    return new Promise((resolve, reject) => {
        let body = JSON.stringify({
            header: init.headers
        })
        let ret = new Response(
            body,
            {'status': 200, 'statusText': 'ok'}
        )
        resolve(ret)
        // reject
    })
}

interface Dumy {
    headers?: any
}
test('test Get Header Default', async () => {

    fetch.mockImplementation(mock)

    let expect_value: any = {
        'Content-Type': 'application/json'
    }
    let actual_value = await Fetch.get<Dumy>('http://localhost/api/test')
    expect(expect_value).toEqual(actual_value.bound.headers)
})

// test('test InitializeHeader replace', () => {
//     let expect_value: any = {
//         'Content-Type': 'application/form'
//     }
//     let input_value: any = {
//         'Content-Type': 'application/form'
//     }
//     let actual_value: any = Fetch.initialize_header(input_value)
//     expect(expect_value).toEqual(actual_value)
// })

// test('test InitializeHeader set input', () => {
//     let expect_value: any = {
//         'any_header': 'header_value',
//         'Content-Type': 'application/json',
//     }
//     let input_value: any = {
//         'any_header': 'header_value'
//     }
//     let actual_value: any = Fetch.initialize_header(input_value)
//     expect(expect_value).toEqual(actual_value)
// })

// test('test InitializeHeader set input', () => {
//     let expect_value: any = {
//         'any_header': 'header_value',
//         'Content-Type': 'application/form',
//     }
//     let input_value: any = {
//         'any_header': 'header_value',
//         'Content-Type': 'application/form',
//     }
//     let actual_value: any = Fetch.initialize_header(input_value)
//     expect(expect_value).toEqual(actual_value)
// })