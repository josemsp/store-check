import { axiosInstance } from "./httpClient"
import type { paths } from "./types/api"

/* -------------------------------------------------------
 * Utils base
 * ----------------------------------------------------- */

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

type JsonContent<T> =
    T extends {
        content: {
            'application/json': infer R
        }
    }
    ? R
    : never

/* -------------------------------------------------------
 * Params / Query / Headers
 * ----------------------------------------------------- */

type ExtractParams<T> =
    T extends { parameters: infer P }
    ? P extends { path?: infer R }
    ? R
    : never
    : never

type ExtractQuery<T> =
    T extends { parameters: infer P }
    ? P extends { query?: infer R }
    ? R
    : never
    : never

type ExtractHeaders<T> =
    T extends { parameters: infer P }
    ? P extends { header?: infer R }
    ? R
    : never
    : never

/* -------------------------------------------------------
 * Body
 * ----------------------------------------------------- */

type ExtractBody<T> =
    T extends {
        requestBody?: infer RB
    }
    ? JsonContent<RB>
    : never

/* -------------------------------------------------------
 * Responses
 * ----------------------------------------------------- */

type SuccessStatus = 200 | 201 | 202 | 203 | 204

type ExtractSuccessResponse<T> =
    T extends Record<number, any>
    ? {
        [K in keyof T]:
        K extends SuccessStatus
        ? JsonContent<T[K]>
        : never
    }[keyof T]
    : never

type ExtractResponse<T> =
    T extends { responses: infer R }
    ? ExtractSuccessResponse<R>
    : never

/* -------------------------------------------------------
 * API Response (BONUS)
 * ----------------------------------------------------- */

export type ApiError = {
    success: false
    error: {
        code: string
        message: string
    }
}

export type ApiSuccess<T> = T & { success: true }

export type ApiResponse<T> =
    | ApiSuccess<T>
    | ApiError

/* -------------------------------------------------------
 * Core inference
 * ----------------------------------------------------- */

type Operation<
    TPath extends keyof paths,
    TMethod extends HttpMethod
> =
    paths[TPath] extends Record<TMethod, infer O>
    ? O
    : never

export type Body<
    TPath extends keyof paths,
    TMethod extends HttpMethod
> = ExtractBody<Operation<TPath, TMethod>>

type Query<
    TPath extends keyof paths,
    TMethod extends HttpMethod
> = ExtractQuery<Operation<TPath, TMethod>>

type Params<
    TPath extends keyof paths,
    TMethod extends HttpMethod
> = ExtractParams<Operation<TPath, TMethod>>

type Headers<
    TPath extends keyof paths,
    TMethod extends HttpMethod
> = ExtractHeaders<Operation<TPath, TMethod>>


type UnwrapData<T> = T extends { data: infer D } ? D : T

export type Response<
    TPath extends keyof paths,
    TMethod extends HttpMethod
> = UnwrapData<ExtractResponse<Operation<TPath, TMethod>>>

/* -------------------------------------------------------
 * Helpers
 * ----------------------------------------------------- */

type RequestConfig<
    TPath extends keyof paths,
    TMethod extends HttpMethod
> = {
    params?: Params<TPath, TMethod>
    query?: Query<TPath, TMethod>
    headers?: Headers<TPath, TMethod>
}

/* -------------------------------------------------------
 * API Client
 * ----------------------------------------------------- */

export const api = {
    async request<
        TPath extends keyof paths,
        TMethod extends HttpMethod
    >(
        method: TMethod,
        path: TPath,
        config?: RequestConfig<TPath, TMethod>,
        body?: Body<TPath, TMethod>
    ): Promise<Response<TPath, TMethod>> {
        const url = path as string

        const { data } = await axiosInstance.request({
            method,
            url,
            data: body,
            params: config?.query,
            headers: config?.headers,
        })

        return data
    },

    get<TPath extends keyof paths>(
        path: TPath,
        config?: RequestConfig<TPath, 'get'>
    ) {
        return this.request('get', path, config)
    },

    post<TPath extends keyof paths>(
        path: TPath,
        body: Body<TPath, 'post'>,
        config?: RequestConfig<TPath, 'post'>
    ) {
        return this.request('post', path, config, body)
    },

    put<TPath extends keyof paths>(
        path: TPath,
        body: Body<TPath, 'put'>,
        config?: RequestConfig<TPath, 'put'>
    ) {
        return this.request('put', path, config, body)
    },

    patch<TPath extends keyof paths>(
        path: TPath,
        body: Body<TPath, 'patch'>,
        config?: RequestConfig<TPath, 'patch'>
    ) {
        return this.request('patch', path, config, body)
    },

    delete<TPath extends keyof paths>(
        path: TPath,
        config?: RequestConfig<TPath, 'delete'>
    ) {
        return this.request('delete', path, config)
    },
}
