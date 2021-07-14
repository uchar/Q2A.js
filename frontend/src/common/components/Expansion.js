import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
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
    const { data } = this.props;
    return (
      <div>
        <Typography>{getStrings().ASK_Expansion_TITLE}</Typography>
        <Typography style={{ marginBottom: '25px', marginTop: '5px' }}>
          {getStrings().ASK_Expansion_SUBTITLE}
        </Typography>
        {data.map((item) => (
          <Accordion
            key={item.id}
            expanded={expanded === item.panelType}
            onChange={this.handleChange(item.panelType)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography> {item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {item.subtitle?.map((subtitle, index) => (
                <Typography key={index}>{subtitle}</Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    );
  }
}

Expansion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Expansion);
