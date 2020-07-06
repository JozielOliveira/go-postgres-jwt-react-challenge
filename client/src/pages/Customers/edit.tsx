import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Navbar } from 'components';
import {
  createCustomer,
  getCustomersById,
  LocationType,
  CustomerBaseType,
} from 'services';

import { useOnMount } from 'hooks';
import { FormCustomer, normalize } from './Form';

export const EditCustomer = () => {
  const [location, setLocation] = useState<LocationType>();

  const [customer, setCustomer] = useState<CustomerBaseType>();
  const { push } = useHistory();
  const { id } = useParams();

  const initial = async () => {
    const constumer = await getCustomersById(id);
    setCustomer(constumer);
  };
  useOnMount(() => initial());

  const handleCrateCustomer = async (params: CustomerBaseType) => {
    const response = await createCustomer(
      normalize({ ...params, id, location })
    );
    push(`/customer/${response.customerID}`);
  };

  const handleMoveMarker = (position: LocationType) => setLocation(position);

  return (
    <>
      <Navbar />
      {customer && (
        <FormCustomer
          context="Edit"
          initialValues={customer}
          onMoveMarker={handleMoveMarker}
          onSubmit={handleCrateCustomer}
        />
      )}
    </>
  );
};
