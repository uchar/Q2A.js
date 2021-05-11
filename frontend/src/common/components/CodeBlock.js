import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  foundation as light,
  tomorrowNightBright as dark,
} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const CodeBlock = ({ code, lang, showLineNumbers }) => {
  const themeType = useSelector((state) => state.currentUser.theme);
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
        codeTagProps={{ style: { fontSize: '12px' } }}
        showLineNumbers={showLineNumbers}
        language={language.replace('language-', '')}
        style={Object.assign(themeStyle, themeLayout)}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
CodeBlock.defaultProps = {
  lang: 'javascript',
  showLineNumbers: true,
};
CodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  showLineNumbers: PropTypes.bool.isRequired,
};
export default CodeBlock;
