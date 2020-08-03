import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/core';
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from 'react-share';
import renderHTML from 'react-render-html';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  boxNotification: {
    cursor: 'pointer',
    padding: '10px',
    minWidth: '400px',
    margin: '3px 10px 10px 10px',
  },
  boxNotificationName: {
    fontSize: '13px',
  },
  boxNotificationTitle: {
    wordWrap: 'wordBreak',
    textAlign: 'right',
  },
  boxNotificationSubTitle: {
    wordWrap: 'wordBreak',
    textAlign: 'right',
    fontSize: '12px',
  },
}));

const ShareDialog = ({ shareTitle, shareBody, anchor, handleClose }) => {
  const classes = useStyles();
  const [currentUrl, setCurrentUrl] = React.useState('');
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);
  const titleToShare = shareTitle;
  console.log('LINK : ', currentUrl, titleToShare);
  return (
    <Menu
      style={{ maxWidth: '200px', minWidth: '500px' }}
      id="long-menu"
      anchorEl={anchor}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      keepMounted
      open={Boolean(anchor)}
      onClose={handleClose}
    >
      <div style={{ width: '150px', flexDirection: 'row', padding: '0px 16px 0px 16px' }}>
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
      </div>
    </Menu>
  );
};
export default ShareDialog;
