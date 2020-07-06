import React from 'react';
import { Avatar, Button, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { Form, InputText } from 'components';
import * as yup from 'yup';

import { login, LoginResponseType } from 'services';
import { useAdmin } from 'hooks';
import { useHistory } from 'react-router-dom';
import { FixMeLate } from 'types';
import { useStyles } from './style';

const schema = yup.object().shape({
  email: yup.string().email().required('Email is a required field'),
  password: yup.string().required('Password is a required field'),
});

export const Login = () => {
  const classes = useStyles();
  const { setUser } = useAdmin();
  const { push } = useHistory();

  const handleLogin = async (parms: FixMeLate) => {
    const result: LoginResponseType = await login(parms);
    if (result) {
      setUser(result);
      push('/customers');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Form
          className={classes.form}
          validationSchema={schema}
          onSubmit={handleLogin}
        >
          <Grid container spacing={2}>
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
