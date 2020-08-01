import engMoment from 'moment';
import persianMoment from 'jalali-moment';
import 'moment/locale/fa';

export const getProfileImage = (name) => {
  return `https://5f05e1ddde8c410011025a1b.liara.space/q2a/7khatcode-${name}`;
};
export const timeAgo = (time, locale = 'en') => {
  const moment = locale === 'en' ? engMoment : persianMoment;
  moment.locale(locale);
  const createTime = moment.unix(time / 1000);
  const currentTime = moment();
  const diffInDays = currentTime.diff(createTime, 'days');
  if (diffInDays <= 30) {
    return createTime.fromNow();
  }
  return createTime.format('LL');
};
