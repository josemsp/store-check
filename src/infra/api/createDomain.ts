import { api, type HttpMethod } from './api.helper'
import type { DomainApi } from './domain.api'
import type { paths } from './types/api'

export function createDomain<TPrefix extends string>(
    prefix: TPrefix
): DomainApi<TPrefix> {
    return new Proxy(
        {},
        {
            get(_, endpoint: string) {
                return new Proxy(
                    {},
                    {
                        get(_, method: string) {
                            return (body?: unknown) =>
                                api.request(
                                    method as HttpMethod,
                                    `${prefix}/${endpoint}` as keyof paths,
                                    undefined,
                                    body as any
                                )
                        },
                    }
                )
            },
        }
    ) as DomainApi<TPrefix>
}

// export function createDomain<TPrefix extends string>(
//   prefix: TPrefix
// ): DomainApi<TPrefix> {
//   return new Proxy({} as DomainApi<TPrefix>, {
//     get(_, endpoint) {
//       return new Proxy({}, {
//         get(_, method) {
//           return (body?: unknown) => {
//             return api.request(
//               method as HttpMethod,
//               `${prefix}/${String(endpoint)}` as any,
//               undefined,
//               body
//             )
//           }
//         },
//       })
//     },
//   })
// }
