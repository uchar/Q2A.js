import english from '../assets/english';
import persian from '../assets/persian';

export const getLanguage = () => {
  return 'ENGLISH';
};

export const getStrings = () => {
  if (getLanguage() === 'PERSIAN') {
    return persian;
  }
  return english;
};
