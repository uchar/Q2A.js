import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Box } from '@material-ui/core';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    textAlign: 'initial',
    margin: (theme) => theme.spacing(10, 0),
  },
  heading: {
    flexShrink: 0,
    fontSize: '20px',
    fontWeight: '600',
  },
  secondaryHeading: {},
  accordionGroup: {
    // backgroundColor: '#F6F8FB',
  },
  bottomAccordion: { marginTop: (theme) => theme.spacing(5) },
};

export default function ControlledAccordion() {
  const [expanded, setExpanded] = React.useState('panel1');
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={styles.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          sx={styles.accordionGroup}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={styles.heading}>Install - The easy way (for non programmers) </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {[1, 2].map((item, index) => (
            <Typography key={index}>
              {` CDN
              You can start using Material-UI with minimal Front-end infrastructure, which is great for prototyping.

              Two Universal Module Definition (UMD) files are provided:

              one for development: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
              one for production: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js
              You can follow this CDN example to quickly get started.

              ⚠️ Using this approach in production is discouraged though - the client has to download the entire library, regardless of which components are actually used, affecting performance and bandwidth utilization.

              ⚠️ The UMD links are using the latest tag to point to the latest version of the library. This pointer is unstable, it shifts as we release new versions. You should consider pointing to a specific version, such as v4.4.0.
              `}
            </Typography>
          ))}
        </AccordionDetails>
        <AccordionActions>
          <Button size="small">More</Button>
        </AccordionActions>
      </Accordion>
      <Accordion
        sx={styles.bottomAccordion}
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={styles.heading}>Install - The hard way (for e.g programmers )</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros
            in elit. Pellentesque convallis laoreet laoreet.
          </Typography>
        </AccordionDetails>
        <AccordionActions>
          <Button size="small">More</Button>
        </AccordionActions>
      </Accordion>
    </Box>
  );
}
