import renderHTML from 'react-render-html';
import { Typography } from '@material-ui/core';
import React from 'react';
import { parse } from 'node-html-parser';
import CodeBlock from '../components/CodeBlock';

const render7khatcodeHtml = (html) => {
  return renderHTML(
    html
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/<\/?[^>]+>/gi, '')
  );
};
const unescapeCode = (escapedHTML) => {
  return renderHTML(
    escapedHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').toString()
  );
};
export const replacePTagWithTypoGraphy = (valueToParse, textColor = 'textPrimary') => {
  return (
    <Typography color={textColor} style={{ textAlign: 'right', marginTop: '0px', fontSize: '14px' }}>
      {render7khatcodeHtml(valueToParse)}
    </Typography>
  );
};

const detectLink = (node) => {
  const remainingNodes = [];
  let haveUrl = false;
  let url = '';
  node.childNodes.forEach((childNode) => {
    if (childNode.tagName === 'a') {
      haveUrl = true;
      url = childNode.rawAttributes.href;
    } else {
      remainingNodes.push(childNode);
    }
  });
  return { haveUrl, url, remainingNodes };
};
const renderDirectTexts = (node) => {
  const remainingNodes = [];
  const renderedElements = [];
  node.childNodes.forEach((childNode) => {
    if (childNode.tagName === 'a') {
      renderedElements.push(
        <Typography
          color={'textPrimary'}
          display="inline"
          style={{
            fontSize: '14px',
            textDecorationLine: 'underline',
            cursor: 'pointer',
            color: '#ff00ee',
          }}
        >
          {renderHTML(childNode.rawText)}
        </Typography>
      );
    } else if (childNode.nodeType === 3 || childNode.tagName === 'strong' || childNode.tagName === 'font') {
      renderedElements.push(
        <Typography
          color={'textPrimary'}
          display="inline"
          style={{ whiteSpace: 'pre-line', textAlign: 'right', marginTop: '0px', fontSize: '14px' }}
        >
          {renderHTML(childNode.rawText)}
        </Typography>
      );
    } else {
      remainingNodes.push(childNode);
    }
  });
  return { renderedElements, remainingNodes };
};
const recursiveParse = (nodeToParse, textColor = 'textPrimary') => {
  const node = nodeToParse;
  let elements = [];
  const { tagName } = node;

  if (tagName === 'p' || tagName === 'div' || tagName === 'span') {
    const { renderedElements, remainingNodes } = renderDirectTexts(node);
    elements.push(<div style={{ textAlign: 'right' }}>{renderedElements.map((item) => item)}</div>);
    node.childNodes = remainingNodes;
  }
  if (tagName === 'img') {
    try {
      elements.push(renderHTML(node.outerHTML));
    } catch (e) {
      console.log(e);
    }
  }
  if (tagName === 'pre') {
    if (node.innerHTML && node.innerHTML.length > 0) {
      const lang =
        node.classNames && node.classNames.length > 0
          ? node.classNames[0].split(':')[1].replace(';', '')
          : 'cpp';
      elements.push(<CodeBlock lang={lang} code={unescapeCode(node.innerHTML)}></CodeBlock>);
    }
  }
  // TextNode
  node.childNodes.forEach((childNode) => {
    elements = elements.concat(recursiveParse(childNode, textColor));
  });
  return elements;
};
export const legacyParseContent = (valueToParse, textColor = 'textPrimary') => {
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

    return <div style={{ flex: 1, margin: '15px 10px 10px 10px' }}> {parts.map((part) => part)}</div>;
  } catch (e) {
    console.log(e);
  }
};
