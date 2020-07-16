import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const CodeBlock = ({ code }) => {
  return (
    <div dir="ltr" style={{ textAlign: 'left', flex: '1', margin: '5px 0px 5px 10px' }}>
      <SyntaxHighlighter language="javascript" style={docco}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
export default CodeBlock;
