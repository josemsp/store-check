import type { UnwrapData } from "@/infra/api/helpers";
import type { GetResponse, PostBody, PutBody } from "@/infra/api/helpers";

export type Profile = UnwrapData<GetResponse<'/api/v1/users/me'>>

export type User = UnwrapData<GetResponse<'/api/v1/users/{id}'>>;
export type UsersList = UnwrapData<GetResponse<'/api/v1/users'>>;
export type CreateUserInput = PostBody<'/api/v1/users'>;
export type UpdateUserInput = PutBody<'/api/v1/users/{id}'>;
