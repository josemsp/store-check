import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { AppProviders } from './app/app-providers';
import { router } from './app/router';
import './index.css';
import { AppSplash } from './shared/layout/app-splash';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <AppProviders>
    <AppSplash>
      <RouterProvider router={router} />
    </AppSplash>
  </AppProviders>,
  // </StrictMode>,
);
