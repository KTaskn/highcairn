import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'
import urljoin from 'url-join'

interface Response<T> {
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
    private static generateEndpoint(endpoint: string, key?: number): string {
        if (key) {
            return urljoin(endpoint, String(key))
        } else {
            return urljoin(endpoint)
        }
    }

    public static async get<T>(endpoint: string, headers?: any, key?: number): Promise<Response<T>> {
        let url = this.generateEndpoint(endpoint, key)

        const response = await fetch(url, {
            method: 'GET',
            headers: this.initialize_header(headers)
        })
        const data: T = await response.json()
        return {
            bound: data,
            raw: response
        }
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
}