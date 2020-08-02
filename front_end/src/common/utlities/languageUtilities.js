import persian from '../../languages/persian';
import english from '../../languages/english';

export const LANGUAGES = {
  ENGLISH: 'en',
  PERSIAN: 'fa',
};
export const getLanguage = () => {
  return LANGUAGES.PERSIAN;
};
export const getStrings = () => {
  if (getLanguage() === LANGUAGES.PERSIAN) {
    return persian;
  }
  return english;
};
