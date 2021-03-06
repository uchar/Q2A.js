import React from 'react';
import ClipLoader from 'react-spinners/RiseLoader';
import ClipLoader2 from 'react-spinners/CircleLoader';
import { isBrowser } from 'react-device-detect';
import PropTypes from 'prop-types';

const Loading = ({ style, browserSize, mobileSize, type }) => {
  return (
    <div className="sweet-loading">
      <div
        style={
          style || {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }
        }
      >
        {type === 'default' ? (
          <ClipLoader
            size={isBrowser ? browserSize : mobileSize}
            color={'#f72865'}
            loading={true}
            margin={isBrowser ? browserSize / 2 : mobileSize / 2}
          />
        ) : (
          <ClipLoader2
            size={isBrowser ? browserSize : mobileSize}
            color={'#f72865'}
            loading={true}
            margin={isBrowser ? browserSize / 2 : mobileSize / 2}
          />
        )}
      </div>
    </div>
  );
};

Loading.defaultProps = {
  browserSize: 20,
  mobileSize: 4,
  type: 'default',
};
Loading.propTypes = {
  browserSize: PropTypes.number,
  mobileSize: PropTypes.number,
  type: PropTypes.string,
  style: PropTypes.object,
};
export default Loading;
