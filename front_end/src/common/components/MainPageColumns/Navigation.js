import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Announcement, Home, Loyalty,  Settings } from '@material-ui/icons';
import Link from 'next/link';
import { getStrings } from '../../utlities/languageUtilities';
import {Box} from "@material-ui/core";

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 0),
  },
  labelIcon: {
    margin: theme.spacing(0, 1),
  },
  labelText: {
    fontWeight: '600',
    flexGrow: 1,
    fontSize: '13px',
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, target, ...other } = props;
  return (
    <Link href={target}>
      <TreeItem
        label={
          <div className={classes.labelRoot}>
            <LabelIcon color="inherit" className={classes.labelIcon} />
            <Typography variant="body2" className={classes.labelText}>
              {labelText}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </div>
        }
        style={{
          '--tree-view-color': color,
          '--tree-view-bg-color': bgColor,
        }}
        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          selected: classes.selected,
          group: classes.group,
          label: classes.label,
        }}
        {...other}
      />
    </Link>
  );
}

StyledTreeItem.propTypes = {
  target: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const styles = {
  treeView: {
    flexGrow: 1,
  },
  root: {
    margin: (theme)=>theme.spacing(5, 0),
  },
  title: {
    fontSize: '25px',
    fontWeight: '700',
    margin: (theme)=>theme.spacing(5, 0),
  },
};

export default function NavigationMenu() {
  return (
    <Box sx={styles.root}>
      <TreeView
        sx={styles.treeView}
        defaultExpanded={['3']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        <StyledTreeItem target={'/'} nodeId="1" labelText={getStrings().NAVIGATION_HOME} labelIcon={Home} />
        <StyledTreeItem
          target={'/tags'}
          nodeId="2"
          labelText={getStrings().NAVIGATION_TAGS}
          labelIcon={Loyalty}
        />
        <StyledTreeItem
          target={'/blog'}
          nodeId="3"
          labelText={getStrings().NAVIGATION_BLOG}
          labelIcon={Announcement}
        />
        <StyledTreeItem
          target={'#'}
          nodeId="4"
          labelText={getStrings().NAVIGATION_ADMIN}
          labelIcon={SupervisorAccountIcon}
        >
          <StyledTreeItem
            nodeId="5"
            target={'#'}
            labelText={getStrings().NAVIGATION_SETTINGS}
            labelIcon={Settings}
            labelInfo="90"
            color="#1a73e8"
            bgColor="#e8f0fe"
          />
        </StyledTreeItem>
      </TreeView>
    </Box>
  );
}
