import type { paths } from "./types/api";

// Extract responses by status code
type ExtractResponse<
    T,
    Status extends number = 200
> = T extends { responses: { [K in Status]: { content: { 'application/json': infer R } } } }
    ? R
    : never;

// Response types by method and status code
export type GetResponse<Path extends keyof paths, Status extends number = 200> =
    paths[Path] extends { get: infer G }
    ? ExtractResponse<G, Status>
    : never;

export type PostResponse<Path extends keyof paths, Status extends number = 200> =
    paths[Path] extends { post: infer P }
    ? ExtractResponse<P, Status>
    : never;

export type PatchResponse<Path extends keyof paths, Status extends number = 200> =
    paths[Path] extends { patch: infer P }
    ? ExtractResponse<P, Status>
    : never;

export type DeleteResponse<Path extends keyof paths, Status extends number = 200> =
    paths[Path] extends { delete: infer D }
    ? ExtractResponse<D, Status>
    : never;

// Request body types
export type PostBody<Path extends keyof paths> =
    paths[Path] extends { post: { requestBody: { content: { 'application/json': infer B } } } }
    ? B
    : never;

export type PutBody<Path extends keyof paths> =
    paths[Path] extends { put: { requestBody: { content: { 'application/json': infer B } } } }
    ? B
    : never;

export type PatchBody<Path extends keyof paths> =
    paths[Path] extends { patch: { requestBody: { content: { 'application/json': infer B } } } }
    ? B
    : never;

// Query parameters types
export type GetQuery<Path extends keyof paths> =
    paths[Path] extends { get: { parameters: { query?: infer Q } } }
    ? Q
    : never;

export type PostQuery<Path extends keyof paths> =
    paths[Path] extends { post: { parameters: { query?: infer Q } } }
    ? Q
    : never;

// Path parameters types
export type PathParams<Path extends keyof paths> =
    paths[Path] extends { get: { parameters: { path: infer P } } }
    ? P
    : paths[Path] extends { post: { parameters: { path: infer P } } }
    ? P
    : paths[Path] extends { patch: { parameters: { path: infer P } } }
    ? P
    : paths[Path] extends { delete: { parameters: { path: infer P } } }
    ? P
    : never;

// Helper to extract 'data' if exists
export type UnwrapData<T> = T extends { data: infer D } ? D : T;

// Helper to replace path parameters
export type ReplacePathParams<
    Path extends string,
    Params extends Record<string, string | number>
> = Path extends `${infer Start}{${infer Param}}${infer Rest}`
    ? `${Start}${Params[Param]}${ReplacePathParams<Rest, Params>}`
    : Path;

export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    code?: string;
}
