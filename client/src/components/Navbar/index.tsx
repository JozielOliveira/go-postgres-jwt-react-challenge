import React from 'react';
import { AppBar, Link, Toolbar, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

export const Navbar = () => {
  const classes = useStyles();
  const { push } = useHistory();

  return (
    <AppBar position="static" color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <nav>
          <Link variant="h6" color="inherit" href="#" className={classes.link}>
            Overview
          </Link>
          <Link
            variant="h6"
            color="inherit"
            onClick={() => push('/customers')}
            className={classes.link}
          >
            Customers
          </Link>
          <Link variant="h6" color="inherit" href="#" className={classes.link}>
            Reports
          </Link>
          <Link variant="h6" color="inherit" href="#" className={classes.link}>
            Leaderboard
          </Link>
          <Link variant="h6" color="inherit" href="#" className={classes.link}>
            Tags
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
};
