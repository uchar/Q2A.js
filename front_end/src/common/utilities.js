import renderHTML from 'react-render-html';
import { Typography } from '@material-ui/core';
import React from 'react';
import english from '../languages/english';
import persian from '../languages/persian';
import CodeBlock from './components/CodeBlock';

export const getLanguage = () => {
  return 'PERSIAN';
};

export const getStrings = () => {
  if (getLanguage() === 'PERSIAN') {
    return persian;
  }
  return english;
};
export const render7khatcodeHtml = (html) => {
  return renderHTML(
    html
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/<\/?[^>]+>/gi, '')
  );
};
export const unescapeCode = (escapedHTML) => {
  return renderHTML(escapedHTML).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
};
export const replacePTagWithTypoGraphy = (valueToParse, isMainPage = false) => {
  return (
    <Typography
      color={isMainPage ? 'textSecondary' : 'textPrimary'}
      style={{ textAlign: 'right', marginTop: '15px' }}
    >
      {render7khatcodeHtml(valueToParse)}
    </Typography>
  );
};
export const parseContent = (valueToParse, isMainPage = false) => {
  let elements = [];
  while (true) {
    const startOfBeginTag = `${valueToParse}`.indexOf('<pre');

    if (startOfBeginTag !== -1) {
      const endOfBeginTag = `${valueToParse}`.indexOf('>', startOfBeginTag);
      const startOfEndTag = `${valueToParse}`.indexOf('</pre>', endOfBeginTag);
      const code = unescapeCode(valueToParse.substring(endOfBeginTag + 1, startOfEndTag));
      if (startOfBeginTag > 0) {
        elements = elements.concat(
          replacePTagWithTypoGraphy(valueToParse.substr(0, startOfBeginTag), isMainPage)
        );
      }
      elements.push(<CodeBlock code={code}></CodeBlock>);
      valueToParse = valueToParse.substr(startOfEndTag + 6);
    } else {
      elements = elements.concat(replacePTagWithTypoGraphy(valueToParse, isMainPage));
      break;
    }
  }

  const parseResult = <div style={{ flex: 1 }}>{elements.map((element) => element)}</div>;
  return parseResult;
};
