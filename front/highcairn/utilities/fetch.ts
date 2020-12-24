import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'

interface Response<T> {
    raw: globalThis.Response,
    bound: T
}

export default class Fetch {
    private static generateEndpoint(endpoint: string, key?: number): string {
        if (key) {
            return endpoint + key
        } else {
            return endpoint
        }
    }

    static readonly HEADER_TEMPLATE = {
        'Content-Type': 'application/json'
    }

    public static async get<T>(endpoint: string, key?: number, ssr?: boolean, headers?: any): Promise<Response<T>> {
        let url = this.generateEndpoint(endpoint, key)
        if (ssr) {
            url = "http://nginx:80" + url
        }

        if (headers) {
            for (let key in Fetch.HEADER_TEMPLATE) {
                if (!(key in headers)) {
                    headers[key] = Fetch.HEADER_TEMPLATE[key]
                }
            }
        } else {

        }

        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        })
        const data: T = await response.json()
        return {
            bound: data,
            raw: response
        }
    }

    public static async post<T>(endpoint: string, body: T, headers?: any): Promise<Response<T>> {
        const response = await fetch(this.generateEndpoint(endpoint), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            },
            body: JSON.stringify(body)
        })
        const data: T = await response.json()
        return {
            bound: data,
            raw: response
        }
    }
}