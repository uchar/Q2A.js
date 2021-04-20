import React from 'react';
import engMoment from 'moment';
import persianMoment from 'jalali-moment';
import 'moment/locale/fa';
import isEqual from 'react-fast-compare';
import { getLanguage, LANGUAGES, updateLanguageBaseOnUrl } from './languageUtilities';
import { doGraphQLQuery } from '../../API/utilities';

export const getFullUrl = (name) => {
  if (!name) {
    return undefined;
  }
  if (name.includes('http')) {
    return name;
  }
  return `https://5f05e1ddde8c410011025a1b.liara.space/q2a/7khatcode-${name}`;
};

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

const checkTagAndAppend = (tags, newTag) => {
  if (newTag) tags.push(newTag);
  return tags;
};

export const getTagsArray = (tag1, tag2, tag3, tag4, tag5) => {
  let tags = [];
  tags = checkTagAndAppend(tags, tag1);
  tags = checkTagAndAppend(tags, tag2);
  tags = checkTagAndAppend(tags, tag3);
  tags = checkTagAndAppend(tags, tag4);
  tags = checkTagAndAppend(tags, tag5);
  return tags;
};

// build page every revalidateSeconds
export const addRevalidateAndRedux = async (props, reduxStaticProps, revalidateSeconds = 120) => {
  updateLanguageBaseOnUrl(props.locale);
  const getStaticProps = await reduxStaticProps(props);

  getStaticProps.revalidate = revalidateSeconds;
  return getStaticProps;
};

export const DeepMemo = (component) => React.memo(component, isEqual);

export const isLanguageRtl = (language) => {
  if (language === 'fa' || language === 'ar' || language === 'he') return true;
  return false;
};

export const isInClientBrowser = () => {
  return typeof window !== 'undefined';
};

export const getPageCount = (totalCount, perPageCount = 12) => {
  return Math.ceil((totalCount * 1.0) / perPageCount);
};

export const getItemsWithOffsetAndDispatch = async (page, data, store, otherParams = {}, limit = 12) => {
  const response = await doGraphQLQuery(data.gql, {
    ...otherParams,
    ...{ limit, offset: (page - 1) * limit },
  });
  store.dispatch({
    type: data.reduxAction,
    payload: data.responseName ? response[data.responseName] : response,
  });
};
export const getItemsAndDispatch = async (data, params, store) => {
  const response = await doGraphQLQuery(data.gql, params);
  store.dispatch({
    type: data.reduxAction,
    payload: data.responseName ? response[data.responseName] : response,
  });
};
