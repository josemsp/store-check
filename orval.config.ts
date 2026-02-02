import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'https://backend-store-check-dev.jose-salazar.workers.dev/openapi.json',
    },
    output: {
      mode: 'tags',
      target: 'src/infra/api/endpoints/storecheck-generated.ts',
      schemas: 'src/infra/api/model',
      client: 'react-query',
      httpClient: 'axios',
      prettier: true,
      clean: true,
      mock: true,
      override: {
        mutator: {
          path: 'src/infra/api/axios.client.ts',
          name: 'customAxios',
        },
        query: {
          version: 5,
          useQuery: true,
          useMutation: true,
          signal: true,
        },
      },
    },
  },
});
