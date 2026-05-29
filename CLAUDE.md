# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server (Vite)
pnpm build            # tsc -b && vite build
pnpm lint             # ESLint check
pnpm format           # Prettier write
pnpm format:check     # Prettier check (CI)
pnpm preview          # Preview production build
pnpm api:gen          # Regenerate API client from OpenAPI spec via Orval
```

No dedicated test runner script is configured — Vitest is set up but test execution isn't in package.json scripts yet.

## Architecture Overview

**Store Check** is a multi-role store management SPA (Root admin → Owner → Employee). Built with React 19, React Router 7, Vite, Tailwind CSS 4, TypeScript in strict mode. Package manager: **pnpm**.

### Layer Map

```
src/
├── app/          # Bootstrap: router, provider composition, layouts
├── features/     # Vertical slices: auth, onboarding, dashboards, invitations, users
├── shared/       # Cross-feature reuse: UI, guards, hooks, schemas, constants
└── infra/        # External integrations: Supabase auth, Axios client, Orval-generated API
```

### State Management

Three separate layers — do not mix them:

| Concern | Tool |
|---|---|
| Auth session + profile | React Context (`auth-provider`, `profile-provider`) |
| Multi-step form wizard state | Zustand (`use-onboarding-store`) |
| Server/async data | TanStack Query v5 with IndexedDB persistence |

### Routing & Guards

Routes are lazy-loaded in `src/app/router.tsx`. Four guard components in `src/shared/guards/`:

- `ProtectedRoute` — requires authenticated session
- `PublicRoute` — redirects authenticated users away
- `RoleGuard` — role-based access (currently `onlyRoot`)
- `DashboardRedirector` — routes to role-appropriate dashboard on login

### API Layer

API clients are **auto-generated** by Orval from an OpenAPI spec into `src/infra/api/endpoints/`. Do not manually edit `*-generated.ts` files — run `pnpm api:gen` instead. The generated hooks wrap Axios + React Query. The Axios instance in `src/infra/api/axios.client.ts` injects the Supabase auth token via interceptors (`src/infra/api/interceptors.ts`).

### Feature Structure Convention

Each feature under `src/features/<name>/` follows:
```
pages/        # Route-level components
components/   # Feature-specific UI
hooks/        # Feature-specific hooks
stores/       # Zustand stores (if multi-step state needed)
steps/        # Wizard sub-components (onboarding only)
config/       # Static config (step definitions, etc.)
constants/    # Feature constants
schemas/      # Zod schemas (or in shared/schemas/ if cross-feature)
```

### Forms

All forms use **React Hook Form + Zod** via `@hookform/resolvers/zod`. Shared Zod schemas live in `src/shared/schemas/`. Feature-specific schemas go in the feature's own `schemas/` folder.

### UI Components

Custom shadcn-style primitives in `src/shared/components/ui/`. Form-specific wrappers in `src/shared/components/form/`. Use `cn()` from `src/shared/lib/utils.ts` for conditional Tailwind classes.

### Path Alias

`@/*` resolves to `./src/*` (configured in both `tsconfig.json` and `vite.config.ts`).

### Environment Variables

All env vars must be prefixed `VITE_` and are typed/validated in `src/infra/env.ts`. Required vars:
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
- `VITE_API_URL`

### Key Files

| File | Purpose |
|---|---|
| `src/app/router.tsx` | All route definitions |
| `src/app/app-providers.tsx` | Provider composition order |
| `src/app/providers/auth-provider.tsx` | Auth state lifecycle |
| `src/infra/auth/supabase.client.ts` | Supabase client init |
| `src/infra/api/axios.client.ts` | Axios instance + base URL |
| `src/shared/constants/paths.ts` | Route path constants |
| `src/shared/constants/roles.ts` | Role definitions |
| `src/infra/env.ts` | Env var access |

### Tooling Notes

- **Prettier** runs on pre-commit (Husky + lint-staged) — includes import sorting and Tailwind class ordering plugins. Config in `.prettierrc.cjs`.
- **ESLint** uses flat config (`eslint.config.js`) with TypeScript and React Hooks rules.
- **MSW** mock server is set up in `src/infra/api/test/` for testing.
