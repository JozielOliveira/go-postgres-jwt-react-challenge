import React from 'react';
import { Avatar, Button, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { Form, InputText } from 'components';
import * as yup from 'yup';

import { register } from 'services';
import { FixMeLate } from 'types';
import { useHistory } from 'react-router-dom';
import { useStyles } from './style';

const schema = yup.object().shape({
  name: yup.string().required('Name is a required field'),
  email: yup.string().email().required('Email is a required field'),
  password: yup.string().required('Password is a required field'),
});

export const Register = () => {
  const classes = useStyles();
  const { push } = useHistory();

  const handleRegister = async (parms: FixMeLate) => {
    await register(parms);
    push('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Form
          className={classes.form}
          validationSchema={schema}
          onSubmit={handleRegister}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputText
                name="name"
                label="Name"
                autoComplete="fname"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                name="email"
                label="Email Address"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </Form>
      </div>
    </Container>
  );
};
