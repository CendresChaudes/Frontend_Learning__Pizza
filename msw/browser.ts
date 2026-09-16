import { setupWorker } from 'msw/browser';
import { handlers } from '../generated/msw/handlers';

export const worker = setupWorker(...handlers);
