import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from './src/infra/api/test/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
