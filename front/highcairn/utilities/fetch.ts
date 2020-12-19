import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'

export default class Fetch {
    private static generateEndpoint(endpoint: string, key?: number): string {
        if (key) {
            return endpoint + key
        } else {
            return endpoint
        }
    }

    public static async get<T>(endpoint: string, key?: number, ssr?: boolean): Promise<T> {
        let url = this.generateEndpoint(endpoint, key)
        if (ssr) {
            url = "http://nginx:80" + url
        }

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data: T = await res.json()
        return data
    }

    public static async post<T>(endpoint: string, body: T): Promise<T> {
        const res = await fetch(this.generateEndpoint(endpoint), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            },
            body: JSON.stringify(body)
        })
        const data: T = await res.json()
        return data
    }
}