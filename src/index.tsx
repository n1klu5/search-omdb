import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';
import { App } from 'components/App';
import { store } from './store';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { I18NEXT_INSTANCE } from 'shared/i18n';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <I18nextProvider i18n={I18NEXT_INSTANCE}>
      <App />
    </I18nextProvider>
  </Provider>,
);
