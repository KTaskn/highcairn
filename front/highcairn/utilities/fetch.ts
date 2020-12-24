import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'

interface Response<T> {
    raw: globalThis.Response,
    bound: T
}

export default class Fetch {
    static readonly HEADER_TEMPLATE: any = {
        'Content-Type': 'application/json'
    }

    public static initialize_header(headers?: any): any {
        if (headers) {
            for (let key in Fetch.HEADER_TEMPLATE) {
                if (!(key in headers)) {
                    headers[key] = Fetch.HEADER_TEMPLATE[key]
                }
            }
            return headers
        } else {
            return Fetch.HEADER_TEMPLATE
        }
    }
    
    private static generateEndpoint(endpoint: string, key?: number): string {
        if (key) {
            return endpoint + key
        } else {
            return endpoint
        }
    }

    public static async get<T>(endpoint: string, key?: number, ssr?: boolean, headers?: any): Promise<Response<T>> {
        let url = this.generateEndpoint(endpoint, key)
        if (ssr) {
            url = "http://nginx:80" + url
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        })
        console.log(response)
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