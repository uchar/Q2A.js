import React from 'react';
import {
  LineChart,
  AreaChart,
  Area,
  Tooltip,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const reputationData = [
  { name: '2/2/2020', uv: 100 },
  { name: '2/3/2020', uv: 300 },
  { name: '2/4/2020', uv: 405 },
  { name: '2/5/2020', uv: 430 },
  { name: '2/6/2020', uv: 450 },
  { name: '2/7/2020', uv: 450 },
  { name: '2/8/2020', uv: 450 },
  { name: '2/9/2020', uv: 666 },
];

const radarData = [
  {
    subject: 'C++',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Algorithm',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'OpenCV',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'React',
    A: 25,
    B: 25,
    fullMark: 150,
  },
  {
    subject: 'Node.js',
    A: 15,
    B: 10,
    fullMark: 150,
  },
  {
    subject: 'Java',
    A: 45,
    B: 35,
    fullMark: 150,
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 1000,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  texts: { fontSize: 18, marginTop: theme.spacing(1), fontWeight: '100' },
}));

export default function ChartTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant={'h5'} style={{ marginTop: '6px', marginBottom: '10px' }}>
            {'Reputation'}
          </Typography>
          <ResponsiveContainer height={300}>
            <AreaChart data={reputationData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="green" />
            </AreaChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant={'h5'} style={{ marginTop: '6px', marginBottom: '10px' }}>
            {'Your Activity'}
          </Typography>
          <ResponsiveContainer height={300}>
            <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="green" />
            </AreaChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant={'h5'} style={{ marginTop: '6px', marginBottom: '10px' }}>
            {'Skills'}
          </Typography>
          <ResponsiveContainer height={500}>
            <RadarChart cx={300} cy={250} outerRadius={150} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 150]} />
              <Radar name="SKill" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </div>
  );
}
