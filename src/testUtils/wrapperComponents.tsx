import { ReactNode } from 'react';
import { store } from '../store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { I18NEXT_INSTANCE } from 'shared/i18n';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export interface TestWrapperProps {
  children?: ReactNode;
}

export const FullWrapper = ({ children }: TestWrapperProps) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={I18NEXT_INSTANCE}>
        <BrowserRouter>{children}</BrowserRouter>
      </I18nextProvider>
    </QueryClientProvider>
  </Provider>
);

export const IntlWrapper = ({ children }: TestWrapperProps) => (
  <I18nextProvider i18n={I18NEXT_INSTANCE}>{children}</I18nextProvider>
);
