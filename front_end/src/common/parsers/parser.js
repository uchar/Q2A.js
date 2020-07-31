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

const makeInlineTypoGraphy = (
  content,
  typoGraphyTypes = [],
  fontSize = '14px',
  marginLeft = '1px',
  marginRight = '1px'
) => {
  let isBold = false;
  let isItalic = false;
  let isCode = false;
  typoGraphyTypes.forEach((type) => {
    if (type === 'strong') {
      isBold = true;
    } else if (type === 'italic') {
      isItalic = true;
    } else if (type === 'code') {
      isCode = true;
    }
  });
  return (
    <Typography
      color="textPrimary"
      display="inline"
      style={{
        fontSize,
        fontWeight: isBold ? '700' : '500',
        fontStyle: isItalic ? 'italic' : 'normal',
        backgroundColor: isCode ? '#eeeeee' : 'default',
        marginRight,
        marginLeft,
      }}
    >
      {` ${renderHTML(content)} `}
    </Typography>
  );
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
    } else if (childNode.tagName === 'code') {
      const newTypes = [...typoGraphyTypes];
      newTypes.push('code');
      reactElements = reactElements.concat(convertNodeToReactElements(childNode, newTypes));
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
    if (type === 'bullet') reactElements.push(makeInlineTypoGraphy('&#9670;', [], '12px', '5px'));
    else reactElements.push(makeInlineTypoGraphy(`${listItemNumber}.`, [], '12px', '5px'));
    listItemNumber += 1;
    reactElements = reactElements.concat(convertNodeToReactElements(childNode));
    listItems.push(<ListItem>{reactElements.map((element) => element)}</ListItem>);
    reactElements = [];
  });
  return (
    <List component="nav" aria-label="main mailbox folders">
      {listItems.map((item) => item)}
    </List>
  );
};

export const parseContent = (content) => {
  console.log('In new parser ', content);
  const root = parse(content, {
    lowerCaseTagName: false, // convert tag name to lower case (hurt performance heavily)
    script: false, // retrieve content in <script> (hurt performance slightly)
    style: false, // retrieve content in <style> (hurt performance slightly)
    pre: true, // retrieve content in <pre> (hurt performance slightly)
    comment: false, // retrieve comments (hurt performance slightly)
  });
  console.log('Root:', root);
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
    }
  });
  return (
    <div style={{ flex: 1, margin: '15px 10px 10px 10px' }}>{reactElements.map((element) => element)}</div>
  );
};
