import React, { useState, useEffect } from 'react';

import {
  getPaymentMethodsCustomersById,
  PaymentMethodsByCustomerType,
} from 'services';
import { Grid, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Table } from './Table';

export const Payments = ({ id }: { id: string }) => {
  const { push } = useHistory();
  const [paymentmethods, setPaymentmethods] = useState<
    PaymentMethodsByCustomerType[]
  >();

  const initial = async () => {
    const response = await getPaymentMethodsCustomersById(id);
    setPaymentmethods(response);
  };

  useEffect(() => {
    initial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {paymentmethods && <Table paymentMethods={paymentmethods} />}
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => push(`/create-payment/${id}`)}
          variant="contained"
          color="primary"
        >
          Add Payment Method
        </Button>
      </Grid>
    </Grid>
  );
};
