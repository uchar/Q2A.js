import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getStrings } from '../utlities/languageUtilities';

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
    const { expanded } = this.state;
    return (
      <div>
        <Typography>{getStrings().ASK_Expansion_TITLE}</Typography>
        <Typography style={{ marginBottom: '25px', marginTop: '5px' }}>
          {getStrings().ASK_Expansion_SUBTITLE}
        </Typography>
        <Accordion expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography> {getStrings().ASK_Expansion_PANEL1_TITLE}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {getStrings().ASK_Expansion_PANEL1_SUBTITLE1}
              <br />
              {getStrings().ASK_Expansion_PANEL1_SUBTITLE2}
              <br />
              {getStrings().ASK_Expansion_PANEL1_SUBTITLE3}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography> {getStrings().ASK_Expansion_PANEL2_TITLE}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{getStrings().ASK_Expansion_PANEL2_SUBTITLE1}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography> {getStrings().ASK_Expansion_PANEL3_TITLE}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{getStrings().ASK_Expansion_PANEL3_SUBTITLE1}</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

Expansion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Expansion);
