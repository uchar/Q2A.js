import React from 'react';
import { create } from 'jss';
import { jssPreset, StylesProvider } from '@material-ui/core/styles';
import rtl from 'jss-rtl';
import { useSelector } from 'react-redux';
import { isLanguageRtl } from '../utlities/generalUtilities';
import { getLanguage } from '../utlities/languageUtilities';

const rtlJss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

const JssStylesProvider = (props) => {
  const isRTL = isLanguageRtl(getLanguage());
  if (isRTL)
    return (
      <StylesProvider jss={rtlJss}>
        <div dir="rtl">{props.children}</div>
      </StylesProvider>
    );
  return <div dir="ltr">{props.children}</div>;
};

export default JssStylesProvider;
