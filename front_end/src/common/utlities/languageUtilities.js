import persian from '../../languages/persian';
import english from '../../languages/english';
import { getCurrentUser } from '../../API/utilities';

let currentLanguage;

const LANGUAGES = {
  ENGLISH: 'en',
  PERSIAN: 'fa',
};

const updateLanguageBaseOnUrl = () => {
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
    updateLanguageBaseOnUrl();
  }
  return currentLanguage;
};

const getStrings = () => {
  if (getLanguage() === LANGUAGES.PERSIAN) {
    return persian;
  }
  return english;
};

const getInitialLocale = async () => {
  // first check if user choose any language before
  try {
    const user = await getCurrentUser();
    if (user) return user.language;
    // user probably not login
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

export { LANGUAGES, getLanguage, getStrings, getInitialLocale, updateLanguageBaseOnUrl };
