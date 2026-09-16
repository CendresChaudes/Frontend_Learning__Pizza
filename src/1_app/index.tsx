import './ui/index.css';
import { createRoot } from 'react-dom/client';
import { CAppGeneral } from '~core/config';
import { isAvifWebpBrowserSupport } from '~shared/lib';
import { AppEntry } from './ui';

async function enableMocking() {
  if (CAppGeneral.IS_MOCKING_ACTIVE) {
    const { worker } = await import('~msw/browser');

    return worker.start();
  }

  return Promise.resolve();
}

await enableMocking();

isAvifWebpBrowserSupport();

const rootNodeElement = document.querySelector('#app');

if (rootNodeElement) {
  createRoot(rootNodeElement).render(<AppEntry />);
} else {
  throw new Error('Root-элемент не был найден!');
}
