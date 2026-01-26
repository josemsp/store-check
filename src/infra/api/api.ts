import type { paths } from "./types/api"
import { axiosInstance } from "./httpClient"

export const api = {
    get<TPath extends keyof paths>(
        path: TPath,
    ) {
        return axiosInstance.get(path as string)
    },
    // post<TPath extends keyof paths>(
    //     path: TPath,
    //     ...args: HasBody<PostBody<TPath>> extends true
    //         ? [body: PostBody<TPath>]
    //         : []
    // ) {
    //     const body = args[0]
    //     return axiosInstance.post(path as string, body)
    // },
    async post<TPath extends keyof paths>(
        path: TPath,
        body: PostBody<TPath>
    ): Promise<PostResponse<TPath>> {
        const { data } = await axiosInstance.post(path as string, body)
        return data
    },
    put<TPath extends keyof paths>(
        path: TPath,
        ...args: HasBody<PutBody<TPath>> extends true
            ? [body: PutBody<TPath>]
            : []
    ) {
        const body = args[0]
        return axiosInstance.put(path as string, body)
    },
    delete<TPath extends keyof paths>(
        path: TPath,
    ) {
        return axiosInstance.delete(path as string)
    },
    patch<TPath extends keyof paths>(
        path: TPath,
        ...args: HasBody<PatchBody<TPath>> extends true
            ? [body: PatchBody<TPath>]
            : []
    ) {
        const body = args[0]
        return axiosInstance.patch(path as string, body)
    },
}

type HasBody<T> = T extends never ? false : true

type JsonRequestBody<T> =
    T extends {
        requestBody?: {
            content: {
                'application/json': infer B
            }
        }
    }
    ? B
    : never

type PostBody<TPath extends keyof paths> =
    paths[TPath] extends { post: infer P }
    ? P extends {
        requestBody?: {
            content: {
                'application/json': infer B
            }
        }
    }
    ? B
    : never
    : never
// type PostBody<TPath extends keyof paths> =
//     paths[TPath] extends { post: infer P }
//     ? JsonRequestBody<P>
//     : never

type PutBody<TPath extends keyof paths> =
    paths[TPath] extends { put: infer P }
    ? JsonRequestBody<P>
    : never

type PatchBody<TPath extends keyof paths> =
    paths[TPath] extends { patch: infer P }
    ? JsonRequestBody<P>
    : never

// 
type JsonResponse<T> =
    T extends {
        content: {
            'application/json': infer R
        }
    }
    ? R
    : never

type SuccessResponses<T> =
    T extends Record<number, infer R>
    ? {
        [K in keyof T]:
        K extends 200 | 201 | 202 | 204
        ? JsonResponse<T[K]>
        : never
    }[keyof T]
    : never

type PostResponse<TPath extends keyof paths> =
    paths[TPath] extends {
        post: {
            responses: infer R
        }
    }
    ? SuccessResponses<R>
    : never