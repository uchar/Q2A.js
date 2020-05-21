import english from '../languages/english';
import persian from '../languages/persian';

export const getLanguage = () => {
  return 'ENGLISH';
};

export const getStrings = () => {
  if (getLanguage() === 'PERSIAN') {
    return persian;
  }
  return english;
};
