import React from 'react';
import { parse } from 'node-html-parser';
import { Typography } from '@material-ui/core';
import renderHTML from 'react-render-html';
import * as lodash from 'lodash';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CodeBlock from '../components/CodeBlock';
import { isLanguageRtl } from '../utlities/generalUtilities';

let extraTextStyle = {};
let isTextPrimary = true;
let isRTL = false;

const getTagName = (node) => {
  if (node && node.tagName) return node.tagName.toLowerCase();
  return null;
};
const makeInlineTypoGraphy = (content, typoGraphyTypes = [], inputStyle = {}) => {
  let isBold = false;
  let isItalic = false;
  let isCode = false;
  let link = false;
  typoGraphyTypes.forEach((type) => {
    if (type === 'strong') {
      isBold = true;
    } else if (type === 'italic') {
      isItalic = true;
    } else if (type === 'code') {
      isCode = true;
    } else if (type.includes('link')) {
      link = type.replace('link-', '');
    }
  });
  const linkStyle = link ? { textDecorationLine: 'underline', cursor: 'pointer', color: '#ff00ee' } : {};
  const typographyObject = (
    <Typography
      color={isTextPrimary ? 'textPrimary' : 'textSecondary'}
      display="inline"
      style={{
        fontWeight: isBold ? '700' : '500',
        fontStyle: isItalic ? 'italic' : 'normal',
        backgroundColor: isCode ? '#eeeeee' : 'default',
        marginLeft: '1px',
        marginRight: '1px',
        ...linkStyle,
        ...inputStyle,
        ...extraTextStyle,
      }}
    >
      {` ${renderHTML(content)} `}
    </Typography>
  );
  if (link) {
    return (
      <a href={link} target="_blank">
        {' '}
        {typographyObject}
      </a>
    );
  }
  return typographyObject;
};

const convertNodeToReactElements = (node, typoGraphyTypes = []) => {
  let reactElements = [];
  node.childNodes.forEach((childNode) => {
    const tagName = getTagName(childNode);
    if (childNode.nodeType  === 3) {
      reactElements.push(makeInlineTypoGraphy(childNode.rawText, typoGraphyTypes));
    } else if (tagName === 'p') {
      reactElements = reactElements.concat(convertNodeToReactElements(childNode, typoGraphyTypes));
    } else if (tagName === 'i') {
      const newTypes = [...typoGraphyTypes];
      newTypes.push('italic');
      reactElements = reactElements.concat(convertNodeToReactElements(childNode, newTypes));
    } else if (tagName === 'strong') {
      const newTypes = [...typoGraphyTypes];
      newTypes.push('strong');
      reactElements = reactElements.concat(convertNodeToReactElements(childNode, newTypes));
    } else if (tagName === 'a') {
      const newTypes = [...typoGraphyTypes];
      newTypes.push(`link-${childNode.rawAttributes.href}`);
      reactElements = reactElements.concat(convertNodeToReactElements(childNode, newTypes));
    } else if (tagName === 'code') {
      const newTypes = [...typoGraphyTypes];
      newTypes.push('code');
      reactElements = reactElements.concat(convertNodeToReactElements(childNode, newTypes));
    } else if (tagName === 'ul') {
      reactElements = reactElements.concat(handleListTag(childNode, 'bullet'));
    } else if (tagName === 'ol') {
      reactElements = reactElements.concat(handleListTag(childNode, 'number'));
    } else if (tagName === 'figure') {
      reactElements = reactElements.concat(handleImageTag(childNode));
    }
  });
  return reactElements;
};

const handlePTag = (node) => {
  const reactElements = convertNodeToReactElements(node);
  return (
    <div style={{ textAlign: isRTL ? 'right' : 'left', flex: 1 }}>
      {reactElements.map((element) => element)}
    </div>
  );
};

const unescapeCode = (escapedHTML) => {
  return escapedHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
};

const handleCodeTag = (node) => {
  if (node.childNodes.length === 0) {
    return <div />;
  }
  const codeNode = parse(lodash.get(node, 'childNodes[0].rawText', '<div/>'));
  const language = lodash.get(codeNode, 'childNodes[0].classNames[0]', 'cpp');
  const code = lodash.get(codeNode, 'rawText', '');
  return <CodeBlock lang={language} code={unescapeCode(code)} />;
};

const handleListTag = (node, type) => {
  let reactElements = [];
  const listItems = [];
  let listItemNumber = 1;
  node.childNodes.forEach((childNode) => {
    if (type === 'bullet')
      reactElements.push(makeInlineTypoGraphy('&#x25CF;', [], { fontSize: '12px', marginLeft: '4px' }));
    else
      reactElements.push(
        makeInlineTypoGraphy(`${listItemNumber}.`, [], { fontSize: '12px', marginLeft: '4px' })
      );
    listItemNumber += 1;
    reactElements = reactElements.concat(convertNodeToReactElements(childNode));
    listItems.push(<ListItem>{reactElements.map((element) => element)}</ListItem>);
    reactElements = [];
  });
  return <List style={{ marginRight: '-10px' }}>{listItems.map((item) => item)}</List>;
};

const handleImageTag = (node) => {
  const reactElements = [];
  let isHalfSize = false;
  node.classNames.forEach((className) => {
    if (className === 'image-style-side') isHalfSize = true;
  });

  node.childNodes.forEach((childNode) => {
    const tagName = getTagName(childNode);
    if (tagName === 'img') {
      const imageStyle = { maxWidth: '90%' };
      const halfSizeImageStyle = { maxWidth: '50%', float: 'right' };
      reactElements.push(
        <img style={isHalfSize ? halfSizeImageStyle : imageStyle} src={childNode.rawAttributes.src} />
      );
    }
    if (tagName === 'figcaption') {
      const captionElements = convertNodeToReactElements(childNode);
      reactElements.push(
        <div style={{ flex: 1, textAlign: 'center' }}>{captionElements.map((element) => element)}</div>
      );
    }
  });
  return reactElements;
};

const handleQuoteTag = (node) => {
  let reactElements = [];
  node.childNodes.forEach((childNode) => {
    const tagName = getTagName(childNode);
    if (childNode.nodeType === 3) {
      reactElements.push(<div style={{ flex: 1 }}> {makeInlineTypoGraphy(childNode.rawText)}</div>);
    } else if (tagName === 'p') {
      reactElements = reactElements.concat(<div style={{ flex: 1 }}>{handlePTag(childNode)}</div>);
    } else if (tagName === 'ul') {
      reactElements = reactElements.concat(
        <div style={{ flex: 1 }}>{handleListTag(childNode, 'bullet')}</div>
      );
    } else if (tagName === 'ol') {
      reactElements = reactElements.concat(
        <div style={{ flex: 1 }}>{handleListTag(childNode, 'number')}</div>
      );
    }
  });
  return (
    <blockquote style={{ textAlign: isRTL ? 'right' : 'left', flexDirection: 'row' }}>
      {reactElements.map((element) => element)}
    </blockquote>
  );
};

// Convert html generated by ckeditor to React Elements
export const parseContent = (content, language, textStyle = {}, isPrimary = true) => {
  // TODO : Fix usage of global varialble
  extraTextStyle = textStyle;
  isTextPrimary = isPrimary;
  isRTL = isLanguageRtl(language);
  const root = parse(content, {
    lowerCaseTagName: false, // convert tag name to lower case (hurt performance heavily)
    script: false, // retrieve content in <script> (hurt performance slightly)
    style: false, // retrieve content in <style> (hurt performance slightly)
    pre: true, // retrieve content in <pre> (hurt performance slightly)
    comment: false, // retrieve comments (hurt performance slightly)
  });
  let reactElements = [];

  root.childNodes.forEach((childNode) => {
    const tagName = getTagName(childNode);
    if (childNode.nodeType === 3) {
      reactElements.push(makeInlineTypoGraphy(childNode.rawText));
    } else if (tagName === 'p') {
      reactElements = reactElements.concat(handlePTag(childNode));
    } else if (tagName === 'pre') {
      reactElements = reactElements.concat(handleCodeTag(childNode));
    } else if (tagName === 'ul') {
      reactElements = reactElements.concat(handleListTag(childNode, 'bullet'));
    } else if (tagName === 'ol') {
      reactElements = reactElements.concat(handleListTag(childNode, 'number'));
    } else if (tagName === 'blockquote') {
      reactElements = reactElements.concat(handleQuoteTag(childNode));
    } else if (tagName === 'figure') {
      reactElements = reactElements.concat(handleImageTag(childNode));
    }
  });
  extraTextStyle = false;
  isTextPrimary = true;
  isRTL = false;
  return (
    <div style={{ flex: 1, margin: '10px 10px 5px 10px' }}>{reactElements.map((element) => element)}</div>
  );
};

export const replacePTagWithTypoGraphy = (valueToParse, textColor = 'textPrimary') => {
  return (
    <Typography color={textColor} style={{ textAlign: 'right', marginTop: '0px' }}>
      {renderHTML(
        valueToParse
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/<\/?[^>]+>/gi, '')
      )}
    </Typography>
  );
};
