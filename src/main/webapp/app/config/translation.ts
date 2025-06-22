import { Storage, TranslatorContext } from 'react-jhipster';

import { setLocale } from 'app/shared/reducers/locale';

TranslatorContext.setDefaultLocale('en');
TranslatorContext.setRenderInnerTextForMissingKeys(false);

export const languages: any = {
  en: { name: 'English' },
  'zh-cn': { name: '中文（简体）' },
  cs: { name: 'Český' },
  nl: { name: 'Nederlands' },
  fr: { name: 'Français' },
  de: { name: 'Deutsch' },
  el: { name: 'Ελληνικά' },
  he: { name: 'עברית', rtl: true },
  it: { name: 'Italiano' },
  ja: { name: '日本語' },
  ko: { name: '한국어' },
  'pt-br': { name: 'Português (Brasil)' },
  ro: { name: 'Română' },
  ru: { name: 'Русский' },
  sr: { name: 'Srpski' },
  sv: { name: 'Svenska' },
  vi: { name: 'Tiếng Việt' },
  // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
};

export const locales = Object.keys(languages).sort();

export const isRTL = (lang: string): boolean => languages[lang] && languages[lang].rtl;

export const setTextDirection = (lang: string) => {
  document.querySelector('html').setAttribute('dir', isRTL(lang) ? 'rtl' : 'ltr');
};

export const registerLocale = store => {
  store.dispatch(setLocale(Storage.session.get('locale', 'en')));
};
