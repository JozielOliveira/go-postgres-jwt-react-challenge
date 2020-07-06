import React from 'react';
import { Grid, Container, Button, Typography } from '@material-ui/core';
import * as yup from 'yup';

import { Form, InputText, Map } from 'components';
import { FixMeLate } from 'types';

const messageRequired = 'Required field';

const schema = yup.object().shape({
  methodType: yup.string().required(messageRequired),
  cardNumber: yup.string().required(messageRequired),
  expiryMonth: yup.number().required(messageRequired),
  expiryYear: yup.number().required(messageRequired),
  eWallet: yup.string().required(messageRequired),
  nameOnCard: yup.string().required(messageRequired),
});

export const normalize = (id: number, params: FixMeLate) => {
  const card = params.cardNumber.split(' ');
  return {
    customerId: id,
    methodType: params.methodType,
    cardBin: card[1],
    cardLastFour: card[1],
    expiryMonth: params.expiryMonth,
    expiryYear: params.expiryYear,
    eWallet: params.eWallet,
    nameOnCard: params.nameOnCard,
    billingAddress: params.billingAddress,
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
          <Grid item xs={3}>
            <InputText name="methodType" label="Method Type" />
          </Grid>
          <Grid item xs={9}>
            <InputText name="cardNumber" label="Card Number" />
          </Grid>
          <Grid item xs={6}>
            <InputText name="nameOnCard" label="Name on card" />
          </Grid>
          <Grid item xs={2}>
            <InputText name="expiryMonth" label="Month" />
          </Grid>
          <Grid item xs={2}>
            <InputText name="expiryYear" label="Year" />
          </Grid>
          <Grid item xs={2}>
            <InputText name="eWallet" label="eWallet" />
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
