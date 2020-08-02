import engMoment from 'moment';
import persianMoment from 'jalali-moment';
import 'moment/locale/fa';
import { eNGLISHLANGUAGES } from './languageUtilities';

export const getProfileImage = (name) => {
  return `https://5f05e1ddde8c410011025a1b.liara.space/q2a/7khatcode-${name}`;
};
export const timeAgo = (time, locale = eNGLISHLANGUAGES) => {
  const moment = locale === eNGLISHLANGUAGES ? engMoment : persianMoment;
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
