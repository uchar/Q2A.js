import React, { useEffect } from 'react';
import { Box, Menu } from '@material-ui/core';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import PropTypes from 'prop-types';

const styles = {
  root: {
    maxWidth: '200px',
    minWidth: '500px',
  },
  container: {
    width: '150px',
    flexDirection: 'row',
    padding: (theme) => theme.spacing(0, 3, 0, 3),
  },
  margin: {
    marginRight: (theme) => theme.spacing(1),
  },
};

const ShareDialog = ({ shareTitle, shareBody, anchor, handleClose }) => {
  const [currentUrl, setCurrentUrl] = React.useState('');
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);
  const titleToShare = shareTitle;
  return (
    <Menu
      sx={styles.root}
      id="long-menu"
      anchorEl={anchor}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      keepMounted
      open={Boolean(anchor)}
      onClose={handleClose}
    >
      <Box sx={styles.container}>
        <WhatsappShareButton
          url={currentUrl}
          quote={'test'}
          style={{ marginRight: '7px' }}
          className="Demo__some-network__share-button"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

        <TelegramShareButton
          url={currentUrl}
          title={titleToShare}
          style={{ marginRight: '7px' }}
          className="Demo__some-network__share-button"
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <EmailShareButton
          url={currentUrl}
          subject={titleToShare}
          style={{ marginRight: '7px' }}
          className="Demo__some-network__share-button"
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
        <LinkedinShareButton
          url={currentUrl}
          title={shareTitle}
          summary={shareTitle}
          source={currentUrl}
          className="Demo__some-network__share-button"
          style={{ marginRight: '7px' }}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <TwitterShareButton
          url={currentUrl}
          title={shareTitle}
          style={{ marginRight: '7px' }}
          className="Demo__some-network__share-button"
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <FacebookShareButton url={currentUrl} quote={shareTitle} className="Demo__some-network__share-button">
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </Box>
    </Menu>
  );
};
ShareDialog.propTypes = {
  shareTitle: PropTypes.string.isRequired,
  shareBody: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
};
export default ShareDialog;
