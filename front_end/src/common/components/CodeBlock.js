import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useSelector } from 'react-redux';

const CodeBlock = ({ code, lang }) => {
  const selector = useSelector((state) => state);
  const { themeType } = selector.client;
  const language = lang || 'javascript';
  let themeStyle;
  if (themeType === 'light') {
    themeStyle = docco;
  } else {
    themeStyle = dark;
  }
  const themeLayout = { flex: 1, textAlign: 'left', margin: '5px 0px 5px 10px' };
  return (
    <SyntaxHighlighter
      dir="ltr"
      showLineNumbers
      language={language}
      style={Object.assign(themeStyle, themeLayout)}
    >
      {code}
    </SyntaxHighlighter>
  );
};
export default CodeBlock;
