//CSS
import 'tailwindcss/tailwind.css';
import './index.module.scss';

//Lubraries
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

//Components
import { App } from 'components/App';

// Utilities
import { store } from './store';
import { I18NEXT_INSTANCE } from 'shared/i18n';
import { StrictMode } from 'react';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={I18NEXT_INSTANCE}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </I18nextProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
