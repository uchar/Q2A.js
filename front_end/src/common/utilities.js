import english from '../languages/english';
import persian from '../languages/persian';

export const getLanguage = () => {
  return 'PERSIAN';
};

export const getStrings = () => {
  if (getLanguage() === 'PERSIAN') {
    return persian;
  }
  return english;
};
