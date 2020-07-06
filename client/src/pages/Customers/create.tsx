/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Navbar } from 'components';
import { createCustomer, LocationType, CustomerType } from 'services';

import { FormCustomer, normalize } from './Form';

export const CreateCustomer = () => {
  const [location, setLocation] = useState<LocationType>();
  const { push } = useHistory();

  const handleCrateCustomer = async (params: CustomerType) => {
    const response = await createCustomer(normalize({ ...params, location }));
    push(`/customer/${response.customerID}`);
  };

  const handleMoveMarker = (position: LocationType) => setLocation(position);

  return (
    <>
      <Navbar />
      <FormCustomer
        context="Create"
        onMoveMarker={handleMoveMarker}
        onSubmit={handleCrateCustomer}
      />
    </>
  );
};
