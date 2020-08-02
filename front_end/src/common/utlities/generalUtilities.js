import engMoment from 'moment';
import persianMoment from 'jalali-moment';
import 'moment/locale/fa';
import { getLanguage, LANGUAGES } from './languageUtilities';

export const getFullUrl = (name) => {
  if (!name) {
    return undefined;
  }
  if (name.includes('http')) {
    return name;
  }

export const timeAgo = (time, locale = getLanguage()) => {
  const moment = locale === LANGUAGES.ENGLISH ? engMoment : persianMoment;
  moment.locale(locale);
  const createTime = moment.unix(time / 1000);
  const currentTime = moment();
  const diffInDays = currentTime.diff(createTime, 'days');
  if (diffInDays <= 30) {
    return createTime.fromNow();
  }
  // LL for persian is:1399 خرداد 11 and for english is: August 1 , 2020
  return createTime.format('LL');
};
