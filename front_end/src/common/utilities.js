import renderHTML from 'react-render-html';
import { Typography } from '@material-ui/core';
import React from 'react';
import { parse } from 'node-html-parser';
import { fix } from 'react-syntax-highlighter/dist/cjs/languages/hljs';
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
export const replacePTagWithTypoGraphy = (valueToParse, textColor = 'textPrimary') => {
  return (
    <Typography color={textColor} style={{ textAlign: 'right', marginTop: '0px', fontSize: '14px' }}>
      {render7khatcodeHtml(valueToParse)}
    </Typography>
  );
};

const recursiveParse = (element, textColor = 'textPrimary') => {
  let elements = [];
  if (
    element.tagName === 'p' ||
    (element.tagName === 'div' && element.childNodes.length < 2) ||
    element.tagName === 'font'
  ) {
    elements.push(
      <Typography
        color={'textPrimary'}
        style={{ whiteSpace: 'pre-line', textAlign: 'right', marginTop: '0px', fontSize: '14px' }}
      >
        {renderHTML(element.rawText)}
      </Typography>
    );
  }
  if (element.tagName === 'img') {
    try {
      elements.push(renderHTML(element.outerHTML));
    } catch (e) {
      console.log(e);
    }
  }
  if (element.tagName === 'pre') {
    if (element.innerHTML && element.innerHTML.length > 0) {
      const lang =
        element.classNames && element.classNames.length > 0
          ? element.classNames[0].split(':')[1].replace(';', '')
          : 'cpp';
      elements.push(<CodeBlock lang={lang} code={unescapeCode(element.innerHTML)}></CodeBlock>);
    }
  }
  // TextNode
  element.childNodes.forEach((childNode) => {
    elements = elements.concat(recursiveParse(childNode, textColor));
  });
  return elements;
};
export const parseContent = (valueToParse, textColor = 'textPrimary') => {
  const root = parse(valueToParse, {
    lowerCaseTagName: false, // convert tag name to lower case (hurt performance heavily)
    script: false, // retrieve content in <script> (hurt performance slightly)
    style: false, // retrieve content in <style> (hurt performance slightly)
    pre: true, // retrieve content in <pre> (hurt performance slightly)
    comment: false, // retrieve comments (hurt performance slightly)
  });

  try {
    let parts = [];
    if (root.tagName === null && root.childNodes.length === 1) {
      parts.push(
        <Typography
          color={textColor}
          style={{ whiteSpace: 'pre-line', textAlign: 'right', marginTop: '0px', fontSize: '14px' }}
        >
          {renderHTML(root.rawText)}
        </Typography>
      );
    } else parts = recursiveParse(root, textColor);
    console.log('ROOT IS : ', root);

    console.log('WTF ?', parts);
    return <div style={{ flex: 1, margin: '15px 10px 10px 10px' }}> {parts.map((part) => part)}</div>;
  } catch (e) {
    console.log(e);
  }
};
