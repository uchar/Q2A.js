import persian from '../../languages/persian';
import english from '../../languages/english';

export const getLanguage = () => {
  return 'PERSIAN';
};
export const getStrings = () => {
  if (getLanguage() === 'PERSIAN') {
    return persian;
  }
  return english;
};

export const eNGLISHLANGUAGES = () => {
  return 'en';
};
export const persianLANGUAGES = () => {
  return 'fa';
};
