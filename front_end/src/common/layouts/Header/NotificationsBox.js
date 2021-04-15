import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, Typography } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import Loading from '../../components/Loading';
import { doGraphQLQuery, isSignedIn } from '../../../API/utilities';
import { GET_NOTIFICATIONS } from '../../../API/queries';
import { parseContent } from '../../parsers/parser';
import { timeAgo } from '../../utlities/generalUtilities';
import { getLanguage, getStrings } from '../../utlities/languageUtilities';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '800px',
    minWidth: '500px',
  },
  notificationBox: {
    padding: '10px',
    minWidth: '400px',
    margin: theme.spacing(1, 2, 2, 2),
  },
  notificationBoxNameDate: {
    fontSize: '13px',
  },
  notificationBoxName: {
    margin: theme.spacing(1, 0, 0, 0),
    fontSize: '10px',
  },
  notificationBoxTitle: {
    wordWrap: 'wordBreak',
    textAlign: 'initial',
  },
  notificationBoxSubTitle: {
    wordWrap: 'wordBreak',
    textAlign: 'initial',
    fontSize: '12px',
  },
  noNotifications: {
    paddingTop: '20px',
    paddingBottom: '20px',
    minWidth: '220px',
    minHeight: '50px',
    textAlign: 'center',
  },
  loading: { textAlign: 'center', margin: '15px 0px 15px 0px' },
  boxTop: {
    justifyContent: 'space-between',
    display: 'flex',
  },
}));

const NotificationsBox = ({ notificationAnchor, onClose, onNotificationCountChange }) => {
  const classes = useStyles();
  const limit = 15;
  let offset = 0;
  const [notifications, setNotifications] = React.useState([]);

  const loadMoreNotifications = async () => {
    if (isSignedIn()) {
      const response = await doGraphQLQuery(GET_NOTIFICATIONS, { offset, limit });
      const newNotifications = response.getNotifications;
      let unReadNotifications = 0;
      newNotifications.forEach((notification) => {
        if (!notification.read) unReadNotifications += 1;
      });
      if (unReadNotifications > 0) onNotificationCountChange(unReadNotifications);
      if (offset !== 0) setNotifications(notifications.concat(newNotifications));
      else setNotifications(newNotifications); // in case of rerender
    }
  };
  useEffect(async () => {
    return loadMoreNotifications();
  }, []);

  const fetchMoreData = async () => {
    offset += limit;
    await loadMoreNotifications();
  };

  const scrollComponent =
    notifications.length > 0 ? (
      <InfiniteScroll
        height="500px"
        dataLength={notifications.length}
        next={fetchMoreData}
        hasMore={notifications.length > 0 && notifications.length % limit === 0}
        loader={<Loading browserSize={45} mobileSize={45} type={'circle'} className={classes.loading} />}
      >
        {notifications.map((row) => {
          let name = '';
          if (row.reason === 'COMMENT_RECEIVED') {
            name = getStrings().NOTIFICATION_BOX_RECEIVED_COMMENT;
          } else if (row.reason === 'ANSWER_RECEIVED') {
            name = getStrings().NOTIFICATION_BOX_RECEIVED_ANSWER;
          }
          let url = '';
          try {
            url = JSON.parse(row.metaData).url;
          } catch (e) {}

          return (
            <Link key={row.id} prefetch={false} href={`${url}`}>
              <Paper key={row} className={classes.notificationBox}>
                <div className={classes.boxTop}>
                  <Typography color={'textSecondary'} className={classes.notificationBoxNameDate}>
                    {timeAgo(row.createdAt)}
                  </Typography>
                  <Typography color={'textSecondary'} className={classes.notificationBoxName}>
                    {name}
                  </Typography>
                </div>
                {parseContent(
                  row.title,
                  getLanguage(),
                  { flex: 1, fontSize: '14px', cursor: 'pointer' },
                  true
                )}
                {parseContent(row.content, getLanguage(), { fontSize: '12px' }, false)}
              </Paper>
            </Link>
          );
        })}
      </InfiniteScroll>
    ) : (
      <div className={classes.noNotifications}>
        <Typography variant={'body1'}>{getStrings().NOTIFICATION_BOX_NO_NEW_NOTIFICATION}</Typography>,
      </div>
    );
  return (
    <Menu
      className={classes.root}
      id="long-menu"
      anchorEl={notificationAnchor}
      transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      keepMounted
      open={Boolean(notificationAnchor)}
      onClose={onClose}
    >
      {scrollComponent}
    </Menu>
  );
};
export default NotificationsBox;
