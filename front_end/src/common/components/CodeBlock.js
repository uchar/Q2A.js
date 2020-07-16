import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, dark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useDispatch, useSelector } from 'react-redux';

const CodeBlock = ({ code }) => {
  const selector = useSelector((state) => state);
  const { themeType } = selector.client;
  return (
    <div dir="ltr" style={{ textAlign: 'left', flex: '1', margin: '5px 0px 5px 10px' }}>
      <SyntaxHighlighter language="javascript" style={themeType === 'light' ? docco : dark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
export default CodeBlock;
