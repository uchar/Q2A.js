import React from 'react';
import { parse } from 'node-html-parser';
import { Typography } from '@material-ui/core';
import renderHTML from 'react-render-html';
import * as lodash from 'lodash';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CodeBlock from '../components/CodeBlock';

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
      color="textPrimary"
      display="inline"
      style={{
        fontWeight: isBold ? '700' : '500',
        fontStyle: isItalic ? 'italic' : 'normal',
        backgroundColor: isCode ? '#eeeeee' : 'default',
        fontSize: '14px',
        marginLeft: '1px',
        marginRight: '1px',
        ...linkStyle,
        ...inputStyle,
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
    if (childNode.nodeType === 3) {
      reactElements.push(makeInlineTypoGraphy(childNode.rawText, typoGraphyTypes));
    } else if (childNode.tagName === 'p') {
      reactElements = reactElements.concat(convertNodeToReactElements(childNode, typoGraphyTypes));
    } else if (childNode.tagName === 'i') {
      const newTypes = [...typoGraphyTypes];
      newTypes.push('italic');
      reactElements = reactElements.concat(convertNodeToReactElements(childNode, newTypes));
    } else if (childNode.tagName === 'strong') {
      const newTypes = [...typoGraphyTypes];
      newTypes.push('strong');
      reactElements = reactElements.concat(convertNodeToReactElements(childNode, newTypes));
    } else if (childNode.tagName === 'a') {
      const newTypes = [...typoGraphyTypes];
      newTypes.push(`link-${childNode.rawAttributes.href}`);
      reactElements = reactElements.concat(convertNodeToReactElements(childNode, newTypes));
    } else if (childNode.tagName === 'code') {
      const newTypes = [...typoGraphyTypes];
      newTypes.push('code');
      reactElements = reactElements.concat(convertNodeToReactElements(childNode, newTypes));
    } else if (childNode.tagName === 'ul') {
      reactElements = reactElements.concat(handleListTag(childNode, 'bullet'));
    } else if (childNode.tagName === 'ol') {
      reactElements = reactElements.concat(handleListTag(childNode, 'number'));
    }
  });
  return reactElements;
};

const handlePTag = (node) => {
  const reactElements = convertNodeToReactElements(node);
  return (
    <div style={{ textAlign: 'right', flexDirection: 'row' }}>{reactElements.map((element) => element)}</div>
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

const handleQuoteTag = (node) => {
  let reactElements = [];
  node.childNodes.forEach((childNode) => {
    if (childNode.nodeType === 3) {
      reactElements.push(<div style={{ flex: 1 }}> {makeInlineTypoGraphy(childNode.rawText)}</div>);
    } else if (childNode.tagName === 'p') {
      reactElements = reactElements.concat(<div style={{ flex: 1 }}>{handlePTag(childNode)}</div>);
    } else if (childNode.tagName === 'ul') {
      reactElements = reactElements.concat(
        <div style={{ flex: 1 }}>{handleListTag(childNode, 'bullet')}</div>
      );
    } else if (childNode.tagName === 'ol') {
      reactElements = reactElements.concat(
        <div style={{ flex: 1 }}>{handleListTag(childNode, 'number')}</div>
      );
    }
  });
  return (
    <blockquote style={{ textAlign: 'right', flexDirection: 'row' }}>
      {reactElements.map((element) => element)}
    </blockquote>
  );
};

// Convert html generated by ckeditor to React Elements
export const parseContent = (content) => {
  const root = parse(content, {
    lowerCaseTagName: false, // convert tag name to lower case (hurt performance heavily)
    script: false, // retrieve content in <script> (hurt performance slightly)
    style: false, // retrieve content in <style> (hurt performance slightly)
    pre: true, // retrieve content in <pre> (hurt performance slightly)
    comment: false, // retrieve comments (hurt performance slightly)
  });
  let reactElements = [];
  root.childNodes.forEach((childNode) => {
    if (childNode.nodeType === 3) {
      reactElements.push(makeInlineTypoGraphy(childNode.rawText));
    } else if (childNode.tagName === 'p') {
      reactElements = reactElements.concat(handlePTag(childNode));
    } else if (childNode.tagName === 'pre') {
      reactElements = reactElements.concat(handleCodeTag(childNode));
    } else if (childNode.tagName === 'ul') {
      reactElements = reactElements.concat(handleListTag(childNode, 'bullet'));
    } else if (childNode.tagName === 'ol') {
      reactElements = reactElements.concat(handleListTag(childNode, 'number'));
    } else if (childNode.tagName === 'blockquote') {
      reactElements = reactElements.concat(handleQuoteTag(childNode));
    }
  });
  return (
    <div style={{ flex: 1, margin: '15px 10px 10px 10px' }}>{reactElements.map((element) => element)}</div>
  );
};
