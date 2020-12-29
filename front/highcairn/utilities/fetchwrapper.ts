import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'
import urljoin from 'url-join'
import querystring from 'querystring'

export interface Response<T> {
    raw: globalThis.Response,
    bound: T
}

export default class FetchWrapper {
    static readonly HEADER_TEMPLATE: any = {
        'Content-Type': 'application/json'
    }

    /**
     * Headerを初期化する
     * @param headers 初期化するヘッダー 
     */
    private static initialize_header(headers?: any): any {
        if (headers) {
            for (let key in this.HEADER_TEMPLATE) {
                if (!(key in headers)) {
                    headers[key] = this.HEADER_TEMPLATE[key]
                }
            }
            return headers
        } else {
            return this.HEADER_TEMPLATE
        }
    }
    
    /**
     * 主キーに応じてエンドポイントを生成する（/api/\<endpoint\>/\<key\>）、主キーがない場合はキー指定のないエンドポイントを生成する
     * （/api/\<endpoint\>）
     * @param endpoint エンドポイント
     * @param key 主キー
     */
    private static generateEndpoint(endpoint: string, key?: number, query?: any): string {
        let ret: string = ""
        if (key) {
            ret = urljoin(endpoint, String(key), "/")
        } else {
            ret = urljoin(endpoint, "/")
        }

        if (query) {
            ret = urljoin(ret, '?' + querystring.encode(query))
        }

        return ret
    }

    public static async get<TResponse>(endpoint: string, headers?: any, key?: number, params?: any): Promise<Response<TResponse>> {
        let url = this.generateEndpoint(endpoint, key, params)

        const response = await fetch(url, {
            method: 'GET',
            headers: this.initialize_header(headers)
        })
        const data: TResponse = await response.json()
        return {
            bound: data,
            raw: response
        }
    }

    public static async get4ssr<TResponse>(endpoint: string, headers?: any, key?: number, params?: any): Promise<Response<TResponse>> {
        endpoint = urljoin(process.env.BACKEND_URL, endpoint)
        return await this.get(endpoint, headers, key, params)
    }

    public static async post<TRequest, TResponse>(endpoint: string, body: TRequest, headers?: any): Promise<Response<TResponse>> {
        headers = this.initialize_header(headers)
        headers['X-CSRFToken'] = Cookies.get('csrftoken')

        const response = await fetch(this.generateEndpoint(endpoint), {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
        const data: TResponse = await response.json()
        return {
            bound: data,
            raw: response
        }
    }

    public static async put<TRequest, TResponse>(endpoint: string, key: number, body: TRequest, headers?: any): Promise<Response<TResponse>> {
        headers = this.initialize_header(headers)
        headers['X-CSRFToken'] = Cookies.get('csrftoken')

        const response = await fetch(this.generateEndpoint(endpoint, key), {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body)
        })
        const data: TResponse = await response.json()
        return {
            bound: data,
            raw: response
        }
    }
}