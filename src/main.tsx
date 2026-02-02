import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { AppProviders } from './app/AppProviders';
import { router } from './app/router';
import './index.css';
import { AppSplash } from './shared/layout/AppSplash';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <AppProviders>
    <AppSplash>
      <RouterProvider router={router} />
    </AppSplash>
  </AppProviders>,
  // </StrictMode>,
);
