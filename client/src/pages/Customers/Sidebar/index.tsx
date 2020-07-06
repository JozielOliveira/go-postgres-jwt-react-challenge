import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CustomerType } from 'services';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export const Sidebar = ({ customer }: { customer: CustomerType }) => {
  const classes = useStyles();
  const { push } = useHistory();
  const googleMap = `https://maps.googleapis.com/maps/api/staticmap?center=${customer.Location.country},${customer.Location.city}&zoom=14&size=600x300&markers=color:blue%7C${customer.Location.latitude},${customer.Location.longitude}&maptype=roadmap&key=AIzaSyAlNwBzMFyhB3bjDxVnAE-LQ_rGD_b2bHA`;

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cardMedia} image={googleMap} />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {customer.name}
        </Typography>
        <Typography>{customer.email}</Typography>
        <Typography>{customer.telephone}</Typography>
      </CardContent>
      <Button
        onClick={() => push(`/edit-customer/${customer.customerID}`)}
        size="small"
        color="primary"
      >
        edit
      </Button>
    </Card>
  );
};
