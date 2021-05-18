import React from 'react';
import PropTypes from 'prop-types';
import { isLanguageRtl } from '../utlities/generalUtilities';
import { getLanguage } from '../utlities/languageUtilities';

const JssStylesProvider = (props) => {
  const isRTL = isLanguageRtl(getLanguage());
  if (isRTL) return <div dir="rtl">{props.children}</div>;
  return <div dir="ltr">{props.children}</div>;
};
JssStylesProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
export default JssStylesProvider;
