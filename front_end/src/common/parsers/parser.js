import React from 'react';
import { parse } from 'node-html-parser';
import { Typography } from '@material-ui/core';
import renderHTML from 'react-render-html';

const makeInlineTypoGraphy = (content, typoGraphyTypes) => {
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
        fontSize: '14px',
        fontWeight: isBold ? '700' : '500',
        fontStyle: isItalic ? 'italic' : 'normal',
        backgroundColor: isCode ? '#eeeeee' : 'default',
      }}
    >
      {`${renderHTML(content)}`}
    </Typography>
  );
};

const convertNodeToReactElements = (node, typoGraphyTypes = []) => {
  let reactElements = [];
  node.childNodes.forEach((childNode) => {
    if (childNode.nodeType === 3) {
      reactElements.push(makeInlineTypoGraphy(childNode.rawText, typoGraphyTypes));
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
    <div style={{ margin: '15px 15px 10px 20px', flex: 1, textAlign: 'right', flexDirection: 'row' }}>
      {reactElements.map((element) => element)}
    </div>
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
    if (childNode.tagName === 'p') {
      reactElements = reactElements.concat(handlePTag(childNode));
    }
  });
  console.log('RESULT : ', reactElements);
  return <div>{reactElements.map((element) => element)}</div>;
};
