import React from 'react';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/RiseLoader';
import { Typography } from '@material-ui/core';
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
        <ClipLoader css={override} size={20} color={'#f72865'} loading={true} margin={10} />
        <Typography
          color="textPrimary"
          style={{ fontSize: 22, textAlign: 'center', marginTop: '50px' }}
        ></Typography>
      </div>
    </div>
  );
}
