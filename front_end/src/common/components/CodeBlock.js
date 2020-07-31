import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  foundation as light,
  tomorrowNightBright as dark,
} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useSelector } from 'react-redux';

const CodeBlock = ({ code, lang }) => {
  const selector = useSelector((state) => state);
  const { themeType } = selector.client;
  const language = lang || 'javascript';
  let themeStyle;
  if (themeType === 'light') {
    themeStyle = light;
  } else {
    themeStyle = dark;
  }
  const themeLayout = { flex: 1, fontSize: '25px', textAlign: 'left', margin: '5px 0px 5px 10px' };
  return (
    <div style={{ flex: 1, textAlign: 'left' }}>
      <SyntaxHighlighter
        dir="ltr"
        showLineNumbers
        language={language.replace('language-', '')}
        style={Object.assign(themeStyle, themeLayout)}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
export default CodeBlock;
