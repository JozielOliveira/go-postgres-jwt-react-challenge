import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Container, Button } from '@material-ui/core';

import { Navbar } from 'components';
import { getCustomers, CustomerType } from 'services';
import { useOnMount } from 'hooks';
import { Table } from './Table';

export const Costumers = () => {
  const [customers, setCustomers] = useState<CustomerType[]>();
  const { push } = useHistory();

  const inital = async () => {
    const response = await getCustomers();
    setCustomers(response.customers);
  };

  useOnMount(() => inital());

  return (
    <>
      <Navbar />
      <Container component="main" style={{ marginTop: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {customers && <Table customers={customers} />}
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() => push('/create-customer')}
              variant="contained"
              color="primary"
            >
              Add Cutomers
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
