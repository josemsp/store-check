import type { Body, HttpMethod, Response } from './api.helper'
import type { paths } from './types/api'

/* ---------------------------------------
 * Method signature
 * ------------------------------------- */
export type MethodFn<
    TPath extends keyof paths,
    TMethod extends HttpMethod
> =
    Body<TPath, TMethod> extends never
    ? () => Promise<Response<TPath, TMethod>>
    : (
        body: Body<TPath, TMethod>
    ) => Promise<Response<TPath, TMethod>>
