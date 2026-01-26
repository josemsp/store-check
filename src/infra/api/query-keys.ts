export const queryKeys = {
    // Profile
    profiles: {
        all: ['profiles'] as const,
        me: () => [...queryKeys.profiles.all, 'me'] as const,
    },

    // Users
    users: {
        all: ['users'] as const,
        lists: () => [...queryKeys.users.all, 'list'] as const,
        list: (filters?: Record<string, unknown>) =>
            [...queryKeys.users.lists(), filters] as const,
        details: () => [...queryKeys.users.all, 'detail'] as const,
        detail: (id: string) => [...queryKeys.users.details(), id] as const,
    },

    // Companies
    companies: {
        all: ['companies'] as const,
        lists: () => [...queryKeys.companies.all, 'list'] as const,
        list: (filters?: Record<string, unknown>) =>
            [...queryKeys.companies.lists(), filters] as const,
        details: () => [...queryKeys.companies.all, 'detail'] as const,
        detail: (id: string) => [...queryKeys.companies.details(), id] as const,
    },
} as const;
