import type { DomainPaths, MethodsForPath, EndpointName } from './domain.types'
import type { MethodFn } from './domain.method'

/* ---------------------------------------
 * Typed domain
 * ------------------------------------- */
export type DomainApi<TPrefix extends string> = {
    [P in DomainPaths<TPrefix> as
    EndpointName<TPrefix, P>]: {
        [M in MethodsForPath<P>]:
        MethodFn<P, M>
    }
}
