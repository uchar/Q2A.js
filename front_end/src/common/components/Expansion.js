import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getStrings } from '../utilities';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class Expansion extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = (panel) => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <div className={classes.root}>
        <Typography className={classes.heading} component="p">
          {getStrings().ASK_Expansion_TITLE}
        </Typography>
        <Typography
          className={classes.secondaryHeading}
          component="p"
          style={{ marginBottom: '25px', marginTop: '5px' }}
        >
          {getStrings().ASK_Expansion_SUBTITLE}
        </Typography>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}> {getStrings().ASK_Expansion_PANEL1_TITLE}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component="p">
              {getStrings().ASK_Expansion_PANEL1_SUBTITLE1}
              <br />
              {getStrings().ASK_Expansion_PANEL1_SUBTITLE2}
              <br />
              {getStrings().ASK_Expansion_PANEL1_SUBTITLE3}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}> {getStrings().ASK_Expansion_PANEL2_TITLE}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component="p">{getStrings().ASK_Expansion_PANEL2_SUBTITLE1}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}> {getStrings().ASK_Expansion_PANEL3_TITLE}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component="p">{getStrings().ASK_Expansion_PANEL3_SUBTITLE1}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

Expansion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Expansion);
