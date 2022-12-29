import type { ResourceKey } from 'i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import main from './main.json';
import movies from './movies.json';

export enum NamespaceNames {
  MAIN = 'main',
  MOVIES = 'movies',
}

const enResources: Record<NamespaceNames, ResourceKey> = {
  [NamespaceNames.MAIN]: main,
  [NamespaceNames.MOVIES]: movies,
};

i18next.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: enResources,
  },
});

export { i18next as I18NEXT_INSTANCE };
