import persian from '../../languages/persian';
import english from '../../languages/english';
import { isLanguageRtl } from './generalUtilities';

let currentLanguage;

const LANGUAGES = {
  ENGLISH: 'en',
  PERSIAN: 'fa',
};

const updateLanguageBaseOnUrl = (locale) => {
  currentLanguage = locale;
  if (typeof window !== 'undefined' && window.location) {
    const { pathname } = window.location;
    const pathParts = pathname.split('/');
    const urlLanguage = pathParts.length > 1 ? pathParts[1] : '';
    Object.keys(LANGUAGES).forEach((key) => {
      if (urlLanguage === LANGUAGES[key]) {
        currentLanguage = LANGUAGES[key];
      }
    });
  }
};
const getLanguage = () => {
  if (!currentLanguage) {
    throw new Error('Language not set!');
  }
  return currentLanguage;
};
const isSiteRTL = () => {
  return isLanguageRtl(getLanguage());
};

const getStrings = () => {
  if (getLanguage() === LANGUAGES.PERSIAN) {
    return persian;
  }
  return english;
};

const getInitialLocale = async () => {
  try {
    const browserLanguage = navigator.language.split('-')[0];
    let userLanguage = LANGUAGES.ENGLISH;
    Object.keys(LANGUAGES).forEach((key) => {
      if (browserLanguage === LANGUAGES[key]) {
        userLanguage = LANGUAGES[key];
      }
    });
    return userLanguage;
  } catch (e) {
    console.log(e);
    // in case of exception use english version
    return LANGUAGES.ENGLISH;
  }
};

export { LANGUAGES, getLanguage, getStrings, getInitialLocale, updateLanguageBaseOnUrl, isSiteRTL };
