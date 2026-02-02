import { setupServer } from 'msw/node';

import { handlers } from './api.mocks';

export const server = setupServer(...handlers);
