import React from 'react';
import { Grid, Container, Button, Typography } from '@material-ui/core';
import * as yup from 'yup';

import { Form, InputText, Map } from 'components';
import { FixMeLate } from 'types';

const messageRequired = 'Required field';

const schema = yup.object().shape({
  name: yup.string().required(messageRequired),
  email: yup.string().email().required(messageRequired),
  telephone: yup.string().required(messageRequired),
});

export const normalize = (params: FixMeLate) => {
  const name = params.name.split(' ');
  return {
    // eslint-disable-next-line radix
    ...(params.id && { customerID: parseInt(params.id) }),
    email: params.email,
    name: params.name,
    familyName: name[0],
    givenName: name[name.length],
    telephone: params.telephone,
    ...(params.telephoneCountry && {
      telephoneCountry: params.telephoneCountry,
    }),
    Location: params.location,
  };
};

export const FormCustomer = ({
  context,
  onSubmit,
  onMoveMarker,
  initialValues,
}: {
  context: string;
  onSubmit: FixMeLate;
  onMoveMarker: FixMeLate;
  // eslint-disable-next-line react/require-default-props
  initialValues?: FixMeLate;
}) => {
  const showTelCoutry = !initialValues || initialValues.telephoneCountry;

  return (
    <Container component="main" style={{ marginTop: 48 }} maxWidth="md">
      <Form
        onSubmit={onSubmit}
        validationSchema={schema}
        initialValues={initialValues}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              {context} Customers
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <InputText name="name" label="Full Name" />
          </Grid>
          <Grid item xs={6}>
            <InputText name="email" label="Email" />
          </Grid>
          {showTelCoutry && (
            <Grid item xs={2}>
              <InputText name="telephoneCountry" label="Tel. Country" />
            </Grid>
          )}
          <Grid item xs={showTelCoutry ? 4 : 6}>
            <InputText name="telephone" label="Telephone" />
          </Grid>
          <Grid item xs={12}>
            <Map
              defaultLocation={
                initialValues && {
                  lat: initialValues?.Location.latitude,
                  lng: initialValues?.Location.longitude,
                }
              }
              style={{ height: 320, position: 'relative' }}
              onMoveMarker={onMoveMarker}
            />
          </Grid>

          <Grid item xs={8} />
          <Grid item xs={4}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {context}
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};
