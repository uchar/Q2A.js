import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Box } from '@material-ui/core';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import CodeBlock from '../CodeBlock';

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
  accordionGroup: {},
  bottomAccordion: { marginTop: (theme) => theme.spacing(5) },
};

const advanceData = [
  {
    id: 1,
    text: 'Clone code from git:',
    code: 'git clone https://github.com/uchar/Q2A.js.git',
  },
  {
    id: 2,
    text:
      'In backend folder Rename .sample to .env and fill the following fields ' +
      'and In frontend folder Rename .sample to .env and fill the following fields',
    code: 'yarn install_packages',
  },
  {
    id: 3,
    text: '(Optional) Add test datas',
    code: 'yarn api_setup',
  },
  {
    id: 4,
    text: 'Run API',
    code: 'yarn api_run_dev',
  },
  {
    id: 5,
    text: 'RUN Q2A',
    code: 'yarn frontend_run_dev',
  },
];
const unescapeCode = (escapedHTML) => {
  return escapedHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
};

const simpleWayData = {
  title: 'Run Q2A - The Simple Way',
  description:
    'Download setup script from link and run it as adminstrator. This will install\n' +
    '              necessary applications including mysql/php/apache/phpMyAdmin/node.js/npm/yarn for you This\n' +
    '              script only works on windows, if you use other OS, Check Install - Advance method',
};
export default function ControlledAccordion(props) {
  const [expanded, setExpanded] = React.useState('panel1');
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ ...styles.root, ...props.sx }}>
      <Accordion boxShadow={12} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          sx={styles.accordionGroup}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={styles.heading}>{simpleWayData.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {[1].map((item, index) => (
            <Typography key={index}>{simpleWayData.description}</Typography>
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
          <Typography sx={styles.heading}>Run Q2A - The Advance Way</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            <li>
              <Typography>Install MySQL</Typography>
            </li>
            <li>
              <Typography>
                Install node/js 14.16.x (better to use{' '}
                <a href="https://github.com/coreybutler/nvm-windows/releases">nvm</a>)
              </Typography>
            </li>
            <li>
              <Typography>Install yarn</Typography>
            </li>
            <li>
              <Typography>Create your database (Set encoding to utf8mb4)</Typography>
            </li>
          </ul>
          {advanceData?.map((item) => (
            <Box key={item.id}>
              <ul>
                <li>
                  <Typography> {item.text}</Typography>
                  <CodeBlock lang={'git'} code={unescapeCode(item.code)} showLineNumbers={false} />
                </li>
              </ul>
            </Box>
          ))}
        </AccordionDetails>
        <AccordionActions>
          <Button size="small">More</Button>
        </AccordionActions>
      </Accordion>
    </Box>
  );
}
