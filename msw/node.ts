import { setupServer } from 'msw/node';
import { handlers } from '../generated/msw/handlers';

export const server = setupServer(...handlers);
