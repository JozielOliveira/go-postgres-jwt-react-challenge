import React, { useState } from 'react';
import { Grid, Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import { Navbar, NavTabs } from 'components';
import { getCustomersById, CustomerType } from 'services';
import { useOnMount } from 'hooks';
import { Sidebar } from './Sidebar';
import { Payments } from './Payments';

export const DetailsCustomer = () => {
  const [customer, setCustomer] = useState<CustomerType>();
  const { id } = useParams();

  const initial = async () => {
    const constumer = await getCustomersById(id);
    setCustomer(constumer);
  };

  useOnMount(() => initial());

  return (
    <>
      <Navbar />
      <Container style={{ margin: 8, padding: 0 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            {customer && <Sidebar customer={customer} />}
          </Grid>
          <Grid item xs={9}>
            <NavTabs
              tabs={[
                {
                  label: 'Overview',
                  component: <>None</>,
                },
                {
                  label: 'Orders',
                  component: <>None</>,
                },
                {
                  label: 'Payment Methods',
                  component: <Payments id={id} />,
                },
                {
                  label: 'Chargebacks',
                  component: <>None</>,
                },
                {
                  label: 'Locations',
                  component: <>None</>,
                },
                {
                  label: 'Devices',
                  component: <>None</>,
                },
                {
                  label: 'Sessions',
                  component: <>None</>,
                },
                {
                  label: 'Showmore',
                  component: <>None</>,
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
