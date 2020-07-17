import React from 'react';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/RiseLoader';
import { Typography } from '@material-ui/core';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Loading() {
  return (
    <div className="sweet-loading">
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <ClipLoader
          css={override}
          size={isBrowser ? 20 : 5}
          color={'#f72865'}
          loading={true}
          margin={isBrowser ? 10 : 2}
        />
      </div>
    </div>
  );
}
