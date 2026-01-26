import { createDomain } from "./createDomain";

export const domains = {
    invitations: createDomain('/api/v1/invitations'),
    users: createDomain('/api/v1/users'),
    companies: createDomain('/api/v1/companies')
}