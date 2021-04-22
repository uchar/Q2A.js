import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box, Button, CardActionArea, CardActions } from '@material-ui/core';

const styles = {
  root: { textAlign: 'initial' },
  card: {},
  title: {
    textAlign: 'center',
  },
};
export default function BlogItem({ data }) {
  return (
    <Box sx={styles.root} container spacing={2}>
      <Card sx={styles.card}>
        <CardContent>
          <Typography sx={styles.title} gutterBottom variant="h5" component="div">
            {data?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Read More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
