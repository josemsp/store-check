import type { HttpMethod } from './api.helper'
import type { paths } from './types/api'
// import type { HttpMethod } from './apiClient' // o duplica el union

/* ---------------------------------------
 * Paths to be used in a domain
 * ------------------------------------- */
export type DomainPaths<TPrefix extends string> = {
    [K in keyof paths]:
    K extends `${TPrefix}/${string}` ? K : never
}[keyof paths]

/* ---------------------------------------
 * Methods available for a path
 * ------------------------------------- */
export type MethodsForPath<TPath extends keyof paths> = {
    [M in HttpMethod]:
    paths[TPath] extends Record<M, any> ? M : never
}[HttpMethod]

/* ---------------------------------------
 * Short name for an endpoint
 * ------------------------------------- */
export type EndpointName<
    TPrefix extends string,
    TPath extends string
> =
    TPath extends `${TPrefix}/${infer Name}`
    ? Name
    : never
